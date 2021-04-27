
import { AsyncSupplier, BiFunction } from './Functions'
import { Futures } from './Futures'

export enum BackoffStrategy {
  LINEAR = 'LINEAR',
  FIBONACCI = 'FIBONACCI',
  EXPONENTIAL = 'EXPONENTIAL',
}

const CALCULATORS: Record<BackoffStrategy, BiFunction<number, number, number>> = {
  [BackoffStrategy.LINEAR]: (_, n) => n + 1,
  [BackoffStrategy.FIBONACCI]: (n1, n2) => n1 + n2,
  [BackoffStrategy.EXPONENTIAL]: (_, n) => n << 1,
}

export class Backoff {

  private prevDelay = 0
  private nextDelay = 1

  /**
   * Creates an instance of a Backoff circuit. Define a function to be called repeatedly until it resolves
   * to true. Each time it resolves to false, the circuit will run again, the timing of which is governed by
   * the BackoffStrategy:
   * LINEAR: subsequent calls are made incrementally by one second (1, 2, 3, 4, 5...)
   * FIBONACCI: subsquent calls are made using the Fibonacci sequence without the leading double 1 (1, 2, 3, 5, 8...)
   * EXPONENTIAL: subsequent calls are made doubling the time of the last (1, 2, 4, 8, 16...)
   *
   * @param {BackoffStrategy} strategy the method in which the duration until the next call is calculted
   * @param {number} maxWait the maximum amount of second to wait before timing out. A timeout will throw an error. Use -1 or 0 for no timeout
   * @param {AsyncSupplier<boolean>} callable the asynchronous callback function, which will stop the circuit when it resolves to TRUE
   * @memberof Backoff
   */
  constructor(
    private readonly strategy: BackoffStrategy,
    private readonly maxWait: number,
    private readonly callable: AsyncSupplier<boolean>) {
    if (strategy !== BackoffStrategy.LINEAR) {
      this.prevDelay = 1
      this.nextDelay = 1
    }
  }

  /**
   * Starts the backoff circuit
   *
   * @param {number} [initialDelay=0] delay the first call by n seconds
   * @memberof Backoff
   */
  async start(initialDelay: number = 0) {
    if (initialDelay > 0)
      await Futures.wait(initialDelay * 1000)
    await this.next()
  }

  private async next(): Promise<boolean> {
    const isResolved = await this.callable()
    if (!isResolved) {
      const currentDelay = this.nextDelay
      const nextDelay = CALCULATORS[this.strategy](this.prevDelay, currentDelay)
      this.prevDelay = currentDelay
      this.nextDelay = nextDelay
      if (this.maxWait > 0 && nextDelay >= this.maxWait) {
        await Futures.wait((this.maxWait - this.prevDelay) * 1000)
        throw new Error(`Maximum timeout of ${this.maxWait} seconds reached`)
      }
      Futures.delayed(currentDelay * 1000, () => this.next())
    }
    return isResolved
  }
}
