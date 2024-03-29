
import { AsyncSupplier, Latchable } from '.'
import { Supplier, VoidFunction } from './Functions'

/**
 * Futures is a namespace containing async functions
 * that serve as async/await wrappers around standard
 * setTimeout and setInterval functions
 */
export namespace Futures {

  /**
   * Delay by a given amount of milliseconds. This is a
   * Promise-based wrapper around setTimeout
   *
   * @export
   * @param {number} ms the amount of milliseconds to wait
   * @returns {Promise<void>}
   */
  export async function wait(ms: number): Promise<void> {
    return new Promise(resolve => {
      setTimeout(resolve, ms)
    })
  }

  /**
   * Delays execution of a function for a given amount of
   * milliseconds. This is a Promise-based wrapper around
   * setTimeout
   *
   * @export
   * @param {number} ms the amount of milliseconds to wait
   * @param {VoidFunction} callback
   */
  export async function delayed(ms: number, callback: VoidFunction) {
    await wait(ms)
    callback()
  }

  /**
   * Schedule a task to be executed a specific time. Note that
   * accuracy to the exact millisecond is not possible due to the
   * nature of the JS event loop. Callback will be fired on the next
   * event loop cycle after the time horizon has passed.
   *
   * @export
   * @param {Date} date
   * @param {VoidFunction} callback
   */
  export function scheduled(date: Date, callback: VoidFunction) {
    const ms = date.getTime()
    if (ms < Date.now())
      throw new Error('Can only schedule a task to run at a future time')
    delayed(ms - Date.now(), callback)
  }

  /**
   * Waits until the provided condition is met. This will not resolve
   * until the condition is true. To use a timeout or handle a condition
   * that may return false, use Futures.waitUntilResolved instead
   *
   * @export
   * @param {(Supplier<boolean | Promise<boolean>>)} condition the condition to be met
   * @param {number} [pollInterval=1] the time in milliseconds between intervals
   * @returns {*}  {Promise<void>}
   */
  export async function waitUntil(condition: Supplier<boolean | Promise<boolean>>, pollInterval: number = 1): Promise<void> {
    return new Promise(resolve => {
      const i = setInterval(async () => {
        if (await condition()) {
          clearInterval(i)
          resolve()
        }
      }, pollInterval)
    })
  }

  /**
   * Waits until the provided condition is met, then resolves
   * unless the condition returns false or timeout is reached, then
   * will reject. Use inside a try/catch
   *
   * @export
   * @param {number} timeout the amount in milliseconds to wait
   * @param {(Supplier<boolean | Promise<boolean>>)} condition the condition to be met
   * @param {number} [pollInterval=1] the time in milliseconds between intervals
   * @returns {*}  {Promise<void>}
   */
  export async function waitUntilResolved(timeout: number, condition: Supplier<boolean | Promise<boolean>>, pollInterval: number = 1): Promise<void> {
    const start = new Date().getTime()
    return new Promise((resolve, reject) => {
      const i = setInterval(async () => {
        if (await condition()) {
          clearInterval(i)
          resolve()
        } else {
          const countdown = (start + timeout) - new Date().getTime()
          if (countdown < 0) {
            clearInterval(i)
            reject(new Error(`Timeout of ${timeout}ms expired while awaiting condition to resolve`))
          }
        }
      }, pollInterval)
    })
  }

  /**
   * Calls an async supplier function and will attempt to return its resolved value within the
   * allotted timeout. If the function does not resolve before the timeout expires, an error is thrown.
   * If the function throws an error before the timeout expires, that error is thrown.
   *
   * @export
   * @template T
   * @param {number} timeout
   * @param {AsyncSupplier<T>} runner
   * @return {*}  {Promise<T>}
   */
  export async function awaitWithTimeout<T>(timeout: number, runner: AsyncSupplier<T>): Promise<T> {
    return Promise.race([
      new Promise<T>((resolve, reject) => runner()
        .then(resolve)
        .catch(reject)
      ),
      new Promise<T>((_, reject) => {
        setTimeout(() => reject(new Error(`Timeout of ${timeout} expired while awaiting runner function to resolve`)), timeout)
      })
    ])
  }
}
