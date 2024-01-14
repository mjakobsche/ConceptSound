export class Semaphore {
    private isClosed: boolean;

    public constructor() {
        this.isClosed = false;
    }

    public async execute(fn: Function) {
        if (this.isClosed) {
            this.isClosed = false;
        } else {
            await fn();
        }
    }

    public closeSemaphore() {
        this.isClosed = true;
    }
}