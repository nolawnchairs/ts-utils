
export namespace Objects {

  /**
   * Filter out all object properties that are null or undefined
   *
   * @export
   * @param {Record<string, any>} input
   * @returns {Record<string, any>}
   */
  export function nonNull<T = Record<string, any>>(input: T): Partial<T> {
    const output = {}
    for (const key of Object.keys(input)) {
      if (input[key] !== null || input[key] !== undefined)
        output[key] = input[key]
    }
    return output
  }

  /**
   * Filter out all object properties that are undefined, keeping
   * null properties
   *
   * @export
   * @param {Record<string, any>} input
   * @returns {Record<string, any>}
   */
  export function nonUndefined<T = Record<string, any>>(input: T): Partial<T> {
    const output = {}
    for (const key of Object.keys(input)) {
      if (input[key] !== undefined)
        output[key] = input[key]
    }
    return output
  }

  /**
   * Filter out all object properties that are considered "false", which
   * includes null, undefined, zero, false and empty strings, objects or arrays
   * null properties
   *
   * @export
   * @param {Record<string, any>} input
   * @returns {Record<string, any>}
   */
  export function truthy<T = Record<string, any>>(input: T): Partial<T> {
    const output = {}
    for (const key of Object.keys(input)) {
      if (!!input[key])
        output[key] = input[key]
    }
    return output
  }

  /**
   * Filter out specified properties with a list of keys
   *
   * @export
   * @param input the input object
   * @param keys the keys to omit
   */
  export function drop<T, K extends keyof T>(input: T, ...keys: K[]): Partial<T> {
    const output: Partial<T> = {}
    for (const key of Object.keys(input) as K[])
      if (!keys.includes(key))
        output[key] = input[key]
    return output
  }
}
