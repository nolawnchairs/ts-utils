
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
  private _isImmutable = false
  constructor(value?: T) {
    this._value = value
    if (value) {
      this._locked = true
    }
  }

  /**
   * Creates an immutable instance that will freeze the
   * value once provided
   *
   * @static
   * @template T the type of the object to latch onto
   * @param {T} [value] the value to latch
   * @return {*}  {Latchable<T>} the new instance
   * @memberof Latchable
   */
  static immutable<T>(value?: T): Latchable<T> {
    const instance = new Latchable<T>(value)
    instance._isImmutable = true
    if (value) {
      Object.freeze(instance._value)
      instance._locked = true
    }
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
    if (this._isImmutable)
      Object.freeze(this._value)
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
