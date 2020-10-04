
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
   * Waits until the provided condition is met. This will not resolve
   * until the condition is true. To use a timeout or handle a condition
   * that may return false, use Futures.waitUntilResolved instead
   *
   * @export
   * @param {(Supplier<boolean | Promise<boolean>>)} condition the condition to be met
   * @param {number} [waitInterval=1] the time in milliseconds between intervals
   * @returns
   */
  export async function waitUntil(condition: Supplier<boolean | Promise<boolean>>, waitInterval: number = 1) {
    return new Promise(resolve => {
      const i = setInterval(async () => {
        if (await condition()) {
          clearInterval(i)
          resolve()
        }
      }, waitInterval)
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
   * @param {number} [waitInterval=1] the time in milliseconds between intervals
   * @returns
   */
  export async function waitUntilResolved(timeout: number, condition: Supplier<boolean | Promise<boolean>>, waitInterval: number = 1) {
    const start = new Date().getTime()
    return new Promise((resolve, reject) => {
      const i = setInterval(async () => {
        if (await condition()) {
          clearInterval(i)
          resolve()
        } else {
          const now = new Date().getTime()
          if (start + timeout >= now) {
            clearInterval(i)
            reject(new Error(`Timeout of ${timeout}ms exhausted while awaiting condition to resolve`))
          }
        }
      }, waitInterval)
    })
  }
}
