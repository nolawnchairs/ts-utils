
import { AsyncSupplier, BiFunction } from './Functions'
import { Futures } from './Futures'

export enum BackoffStrategy {
  LINEAR = 'LINEAR',
  FIBONACCI = 'FIBONACCI',
  EXPONENTIAL = 'EXPONENTIAL',
}

const CALCULATORS: Record<BackoffStrategy, BiFunction<number, number, number>> = {
  [BackoffStrategy.LINEAR]: n => n,
  [BackoffStrategy.FIBONACCI]: (n1, n2) => n1 + n2,
  [BackoffStrategy.EXPONENTIAL]: (_, n) => n << 1,
}

export class Backoff {

  private prevDelay = 1
  private nextDelay = 1

  /**
   * Creates an instance of a Backoff circuit. Define a function to be called repeatedly until it resolves
   * to true. Each time it resolves to false, the circuit will run again, the timing of which is governed by
   * the BackoffStrategy:
   * LINEAR: subsequent calls are made incrementally by one second (1, 2, 3, 4, 5...)
   * FIBONACCI: subsquent calls are made using the Fibonacci sequence (1, 1, 2, 3, 5, 8...)
   * EXPONENTIAL: subsequent calls are made doubling the time of the last (1, 2, 4, 8, 16...)
   *
   * @param {BackoffStrategy} strategy the method in which the duration until the next call is calculted
   * @param {number} maxWait the maximum amount of second to wait before timing out. A timeout will throw an error
   * @param {AsyncSupplier<boolean>} callable the asynchronous callback function, which will stop the circuit when it resolves to TRUE
   * @memberof Backoff
   */
  constructor(
    private readonly strategy: BackoffStrategy,
    private readonly maxWait: number,
    private readonly callable: AsyncSupplier<boolean>) { }

  async start() {
    await this.next()
  }

  private async next(): Promise<boolean> {
    const isResolved = await this.callable()
    if (!isResolved) {
      const nextDelay = CALCULATORS[this.strategy](this.prevDelay, this.nextDelay)
      this.prevDelay = this.nextDelay
      this.nextDelay = nextDelay
      if (this.maxWait > -1 && nextDelay >= this.maxWait) {
        throw new Error(`Maximum timeout of ${this.maxWait} seconds reached`)
      }
      Futures.delayed(nextDelay * 1000, () => this.next())
    }
    return isResolved
  }
}
