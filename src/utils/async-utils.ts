
/**
 * CountDownLatch 类表示一个倒计时锁，它是一种同步原语，允许一个或多个线程等待一组操作完成。
 */
export class CountDownLatch {
    private count: number;
    private resolve: () => void;
    private readonly promise: Promise<void>;

    /**
     * 创建一个新的 CountDownLatch 实例。
     * 初始计数器值为 0，并且使用一个 Promise 来跟踪计数器状态。
     */
    constructor() {
        this.count = 0;
        this.promise = new Promise<void>((resolve) => {
            this.resolve = resolve;
        });
    }

    /**
     * 增加计数器的值。
     */
    public add(): void {
        this.count++;
    }

    /**
     * 减少计数器的值。如果计数器变为 0，则唤醒所有等待的线程。
     */
    public cutDown(): void {
        this.count--;
        if (this.count === 0) {
            this.resolve();
        }
    }

    /**
     * 等待计数器变为 0，即等待所有操作完成。
     * @returns 一个 Promise，在计数器变为 0 时将被解析。
     */
    public await(): Promise<void> {
        return this.promise;
    }
}

/**
 * SyncLock 类表示一个同步锁，用于控制对临界资源的访问。
 * 在 JavaScript 中，由于单线程执行模型，不需要显式实现同步锁。
 * 这个类提供了一个基于 Promise 的简单同步锁的模拟实现。
 */
export class SyncLock {
    private locked: boolean;
    private waitQueue: (() => void)[];

    /**
     * 创建一个新的 SyncLock 实例。
     * 初始状态下锁是未被占用的，并且等待队列为空。
     */
    constructor() {
        this.locked = false;
        this.waitQueue = [];
    }

    /**
     * 获取锁。如果锁已经被占用，则将当前任务加入等待队列，直到锁可用。
     * @returns 一个 Promise，在成功获取锁时被解析。
     */
    lock(): Promise<void> {
        return new Promise<void>((resolve) => {
            if (this.locked) {
                // 如果锁已经被占用，将Promise加入等待队列
                this.waitQueue.push(resolve);
            } else {
                // 锁未被占用，立即执行
                this.locked = true;
                resolve();
            }
        });
    }

    /**
     * 释放锁。如果有等待的任务，从等待队列中取出一个任务并执行。
     */
    unlock(): void {
        if (this.waitQueue.length > 0) {
            // 从等待队列中取出一个Promise并执行
            const nextPromise = this.waitQueue.shift();
            nextPromise!();
        } else {
            // 没有等待的Promise，释放锁
            this.locked = false;
        }
    }
}
