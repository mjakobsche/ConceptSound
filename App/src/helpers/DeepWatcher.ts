import {Ref, watch} from "vue";

export class DeepWatcher {
    private unwatch: Function;

    public constructor() {
        this.resetWatcher();
    }

    public createWatcher(target: Ref<any>, callback: Function) {
        this.unwatch = watch(target, callback, {deep: true});
    }

    public destroyWatcher() {
        this.unwatch();
        this.resetWatcher();
    }

    private resetWatcher() {
        this.unwatch = () => {
        };
    }
}