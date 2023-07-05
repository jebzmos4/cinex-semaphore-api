export class Semaphore {
    private maxConcurrency: number;
    private currentConcurrency: number;
    private waitingQueue: (() => void)[];
  
    constructor(maxConcurrency: number) {
      this.maxConcurrency = maxConcurrency;
      this.currentConcurrency = 0;
      this.waitingQueue = [];
    }
  
    async acquire(): Promise<void> {
      if (this.currentConcurrency < this.maxConcurrency) {
        this.currentConcurrency++;
      } else {
        await new Promise<void>(resolve => this.waitingQueue.push(resolve));
      }
    }
  
    release(): void {
      if (this.waitingQueue.length > 0) {
        const resolve = this.waitingQueue.shift();
        if (resolve) {
          resolve();
        }
      } else {
        this.currentConcurrency--;
      }
    }
  }
  