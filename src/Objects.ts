import { BiFunction } from '.'

export namespace Objects {

  type Keyable = string | number | symbol

  /**
   * Remove all object properties that are null or undefined,
   * but retains falsey values such as empty strings or zero
   *
   * @export
   * @template T
   * @param {T} input the input object
   * @return {*}  {(Partial<T> | T)}
   */
  export function nonNull<T = Record<Keyable, any>>(input: T): Partial<T> | T {
    const output = {}
    for (const key of Object.keys(input)) {
      if (input[key] !== null && input[key] !== undefined)
        output[key] = input[key]
    }
    return output
  }

  /**
   * Remove all object properties that are undefined, but retains
   * null properties and falsey values such as empty strings or zero
   *
   * @export
   * @template T
   * @param {T} input the input object
   * @return {*}  {(Partial<T> | T)}
   */
  export function nonUndefined<T = Record<Keyable, any>>(input: T): Partial<T> | T {
    const output = {}
    for (const key of Object.keys(input)) {
      if (input[key] !== undefined)
        output[key] = input[key]
    }
    return output
  }

  /**
   * Remove all object properties that are considered "falsey", which
   * includes null, undefined, zero, false and empty strings, but retains
   * empty arrays and objects
   *
   * @export
   * @template T
   * @param {T} input the input object
   * @return {*}  {(Partial<T> | T)}
   */
  export function truthy<T = Record<Keyable, any>>(input: T): Partial<T> | T {
    const output = {}
    for (const key of Object.keys(input)) {
      if (!!input[key])
        output[key] = input[key]
    }
    return output
  }

  /**
   * Remove all object properties that are empty (zero-length) strings, but retain
   * all other values
   *
   * @export
   * @template T
   * @param {T} input
   * @return {*}  {(Partial<T> | T)}
   */
  export function nonEmptyStrings<T = Record<Keyable, any>>(input: T): Partial<T> | T {
    const output = {}
    for (const key of Object.keys(input)) {
      if (typeof input[key] == 'string') {
        if (input[key].length > 0)
          output[key] = input[key]
      } else {
        output[key] = input[key]
      }
    }
    return output
  }

  /**
   * Creates a new object without the properties specified by keys
   *
   * @export
   * @template T
   * @template K
   * @param {T} input the input object
   * @param {...K[]} keys the properties to remove
   * @return {*}  {(Partial<T> | T)}
   */
  export function drop<T extends Record<Keyable, any>, K extends keyof T>(input: T, ...keys: K[]): Partial<T> | T {
    const output: Partial<T> = {}
    for (const key of Object.keys(input) as K[])
      if (!keys.includes(key))
        output[key] = input[key]
    return output
  }

  /**
   * Map the result of a function to each entry's value in the object
   *
   * @export
   * @template K
   * @template V
   * @template W
   * @param {Record<K, V>} input the input object
   * @param {BiFunction<Keyable, V, W>} cb the function to map new values, provides key k and value v
   * @return {*}  {Record<K, W>}
   */
  export function mapEntries<K extends Keyable, V, W = keyof K>(input: Record<K, V>, cb: BiFunction<Keyable, V, W>): Record<K, W> {
    return Object.entries(input).reduce((a, [k, v]) => ({ ...a, [k]: cb(k, v as V) }), {} as Record<K, W>)
  }
}
