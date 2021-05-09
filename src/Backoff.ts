
import { AsyncSupplier, BiFunction, VoidFunction } from './Functions'
import { Futures } from './Futures'

export enum BackoffStrategy {
  /**
   * LINEAR backoffs will increment one-by-one (1, 2, 3, 4, 5...)
   */
  LINEAR = 'LINEAR',
  /**
   * FIBONACCI backoffs will use the fibonacci sequence (1, 2, 3, 5, 8...)
   */
  FIBONACCI = 'FIBONACCI',
  /**
   * EXPONENTIAL backoffs will double the time since the last tick (1, 2, 4, 8, 16...)
   */
  EXPONENTIAL = 'EXPONENTIAL',
}

const CALCULATORS: Record<BackoffStrategy, BiFunction<number, number, number>> = {
  [BackoffStrategy.LINEAR]: (_, n) => n + 1,
  [BackoffStrategy.FIBONACCI]: (n1, n2) => n1 + n2,
  [BackoffStrategy.EXPONENTIAL]: (_, n) => n << 1,
}

export interface BackoffOptions {
  /**
   * The strategy to use to calculate the next tick
   */
  strategy: BackoffStrategy
  /**
   * The function which determines when the backoff timer will stop
   */
  callable: AsyncSupplier<boolean>
  /**
   * The maximum time that the backoff will continue before timing out (in seconds).
   * This will throw an error when the timeout is reached
   */
  maxWait?: number
  /**
   * The maximum interval between ticks (in seconds)
   */
  maxInterval?: number
  /**
   * The initial delay until the first tick (in seconds)
   */
  initialDelay?: number
  /**
   * A function that will be called on each tick
   */
  onTick?: VoidFunction
}

export class Backoff {

  private strategy: BackoffStrategy = null
  private callable: AsyncSupplier<boolean> = null
  private prevDelay = 0
  private nextDelay = 1
  private maxInterval = null
  private maxWait = null
  private initialDelay = null
  private onTick: VoidFunction = null

  /**
   * Creates an instance of a Backoff circuit. Define a function (callable) to be called repeatedly until it
   * resolves to true. Each time it resolves to false, the circuit will run again, the timing of which is governed
   * by the BackoffStrategy
   *
   * @param {BackoffOptions} options the options object for this backoff instance
   * @memberof Backoff
   */
  constructor(options: BackoffOptions) {
    this.strategy = options.strategy
    this.callable = options.callable
    this.maxInterval = options.maxInterval ?? -1
    this.maxWait = options.maxWait ?? -1
    this.initialDelay = options.initialDelay ?? 0
    this.onTick = options.onTick
    if (this.strategy != BackoffStrategy.LINEAR) {
      this.prevDelay = 1
      this.nextDelay = 1
    }
  }

  /**
   * Starts the backoff circuit
   *
   * @memberof Backoff
   */
  async start() {
    if (this.initialDelay > 0)
      await Futures.wait(this.initialDelay * 1000)
    const timer = Date.now()
    while (true) {
      this.onTick && this.onTick()
      const isResolved = await this.callable()
      if (isResolved)
        break
      const prevDelay = this.prevDelay
      const currentDelay = this.nextDelay
      const nextDelay = CALCULATORS[this.strategy](prevDelay, currentDelay)
      this.nextDelay = (this.maxInterval > 0 && currentDelay >= this.maxInterval)
        ? currentDelay
        : nextDelay
      this.prevDelay = currentDelay
      if (this.maxWait > 0 && Date.now() - timer >= this.maxWait * 1000)
        throw new Error(`Maximum timeout of ${this.maxWait} seconds reached`)
      await Futures.wait(currentDelay * 1000)
    }
  }
}
