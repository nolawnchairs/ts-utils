
export namespace Enum {

  export enum Type {
    Number = 'number',
    String = 'string'
  }

  /**
   * Gets an array of the enum values
   *
   * @export
   * @template T type of key (string or number)
   * @param {*} object the enum object
   * @param {Type} type the type of enum value (string or number)
   * @returns {T[]} array of values
   */
  export function values<T = string | number | symbol>(object: any, type: Type): T[] {
    return keys(object, type).map(value => object[value])
  }

  /**
   * Gets an array of the enum keys
   *
   * @export
   * @param {*} object the enum object
   * @param {Type} type the type of enum value (string or number)
   * @returns {string[]} array of keys
   */
  export function keys(object: any, type: Type): string[] {
    return Object.keys(object).filter(key => typeof object[key] === type)
  }

  /**
   * Gets the length of the enum's keys
   *
   * @export
   * @param {*} object the enum object
   * @returns {number} count of elements
   */
  export function length(object: any): number {
    return Object.keys(object).length
  }
}
