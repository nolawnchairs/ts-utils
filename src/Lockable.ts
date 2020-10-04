
import { Futures } from './Futures'

/**
 * A holder for a value that can be locked
 *
 * @export
 * @class Latchable
 * @template T the type of object to latch onto
 */
export class Latchable<T> {
  protected _value: T = null
  protected _locked = false
  constructor(value?: T) {
    this._value = value
  }

  /**
   * Creates an immutable instance where the value cannot
   * be changed
   *
   * @static
   * @template T the type of the object to latch onto
   * @param {T} value the value to latch
   * @return {*}  {Latchable<T>} the new instance
   * @memberof Latchable
   */
  static immutable<T>(value: T): Latchable<T> {
    Object.freeze(value)
    const instance = new Latchable<T>(value)
    instance._locked = true
    return instance
  }

  /**
   * Sets the value of the object and locks it
   *
   * @param {T} value the value to latch onto
   * @memberof Latchable
   */
  latch(value: T) {
    if (this._locked)
      throw new Error('Latchable value is already locked')
    this._value = value
    this._locked = true
  }

  /**
   * The current value of the latched object
   *
   * @readonly
   * @type {T}
   * @memberof Latchable
   */
  get value(): T {
    return this._value
  }
}

export class Lockable<T> extends Latchable<T> {
  constructor(value?: T) {
    super(value)
  }

  /**
   * Sets the value. Throws an error if attempting to set
   * while locked
   *
   * @param {T} value the value to set
   * @memberof Lockable
   */
  set(value: T) {
    if (this._locked)
      throw new Error('Lockable value is already locked')
    this._value = value
  }

  /**
   * Offer to set the value. Will wait until the value is unlocked,
   * then will set the value. If a timeout is provided, the offer will
   * reject if the value is not unlocked by the given timeout
   *
   * @param {T} value the value to set
   * @param {number} [timeout] the amount of time in milliseconds to wait
   * @memberof Lockable
   */
  async offer(value: T, timeout?: number) {
    if (timeout) {
      await Futures.waitUntilResolved(timeout, () => !this._locked)
      this._value = value
    } else {
      await Futures.waitUntil(() => !this._locked)
      this._value = value
    }
  }

  /**
   * Locks the value
   *
   * @memberof Lockable
   */
  lock() {
    this._locked = true
  }

  /**
   * Unlocks the value
   *
   * @memberof Lockable
   */
  unlock() {
    this._locked = false
  }
}
