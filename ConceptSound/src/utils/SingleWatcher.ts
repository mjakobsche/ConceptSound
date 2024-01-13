import {Ref, watch} from "vue";

export class SingleWatcher {
    private static instance: SingleWatcher;
    private target: Ref<Object>;

    private constructor() {
    }

    public static getInstance(): SingleWatcher {
        if (!SingleWatcher.instance) {
            SingleWatcher.instance = new SingleWatcher();
        }
        return SingleWatcher.instance;
    }

    public observeTarget(target: Ref<Object>, onChangesThresholdPassed: Function) {
        this.resetTarget(target);
        watch(this.target, onChangesThresholdPassed);
    }

    private resetTarget(target: Ref<Object>) {
        watch(this.target, () => {
        });
        this.target = target;
    }
}
