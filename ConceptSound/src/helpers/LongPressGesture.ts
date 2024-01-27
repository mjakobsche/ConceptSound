import {createGesture, Gesture} from "@ionic/vue";
import {impact} from "@/utils/Impact";

export class LongPressGesture {
    private gesture: Gesture;
    private pressStartTime: number = 0;
    private runImpact;
    private readonly LONG_PRESS_THRESHOLD: number = 500;

    public constructor(target: any, onShortPress, onLongPress) {
        this.gesture = createGesture({
            el: target,
            threshold: 0,
            onStart: this.getOnStartFunction(),
            onEnd: this.getOnEndFunction(onShortPress, onLongPress),
            gestureName: "long-press",
        });
        this.gesture.enable();
    }

    private getOnStartFunction() {
        return () => {
            this.pressStartTime = Date.now();
            this.runImpact = setTimeout(async () => impact(), this.LONG_PRESS_THRESHOLD);
        }
    }

    private getOnEndFunction(onShortPress: Function, onLongPress: Function) {
        return () => {
            if (Date.now() - this.pressStartTime < this.LONG_PRESS_THRESHOLD) {
                clearTimeout(this.runImpact);
                onShortPress();
            } else {
                onLongPress();
            }
        }
    }
}


