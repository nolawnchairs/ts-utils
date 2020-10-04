
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
   * @param {object} anEnum the enum object
   * @returns {T[]} array of values
   */
  export function values<T = string | number>(anEnum: object): T[] {
    return keys(anEnum).map(value => anEnum[value])
  }

  /**
   * Gets an array of the enum keys
   *
   * @export
   * @param {object} anEnum the enum object
   * @returns {string[]} array of keys
   */
  export function keys(anEnum: object): string[] {
    if (isNumeric(anEnum))
      return Object.keys(anEnum).filter(key => typeof anEnum[key] === 'number')
    return Object.keys(anEnum)
  }

  /**
   * Creates an object of key/value pairs from the enum. If the enum
   * values are strings, then the original enum is returned (as it already is
   * a key/value pair). If the enum values are numbers, the type value dictates
   * whether the object is keyed with the enum's numeric value with the labels,
   * or keyed with the labels with the numeric values
   *
   * @export
   * @param {object} anEnum
   * @param {Type} [keysAs=Type.Number]
   * @return {*}  {object}
   */
  export function toObject(anEnum: object, keysAs: Type = Type.Number): object {
    const internalLength = Object.keys(anEnum).length
    const len = length(anEnum)
    if (internalLength === len * 2) { // numerically keyed
      const enumKeys = keys(anEnum)
      if (keysAs === Type.Number) { // return numeric keys
        return enumKeys.reduce((a, c) => ({ ...a, [anEnum[c]]: c }), {})
      } else {
        return enumKeys.reduce((a, c) => ({ ...a, [c]: anEnum[c] }), {})
      }
    }
    return anEnum
  }

  /**
   * Gets the length of the enum's keys
   *
   * @export
   * @param {object} anEnum the enum object
   * @returns {number} count of elements
   */
  export function length(anEnum: object): number {
    return Object.keys(anEnum).filter(k => isNaN(parseInt(k, 10))).length
  }

  /**
   * Determine if an enum values are numeric
   *
   * @export
   * @param {object} anEnum
   * @return boolean
   */
  export function isNumeric(anEnum: object): boolean {
    return Object.keys(anEnum).length === length(anEnum) * 2
  }

  /**
   * Determine if an enum values are numeric and sequential
   *
   * @export
   * @param {object} anEnum
   * @return boolean
   */
  export function isSequential(anEnum: object): boolean {
    if (!isNumeric(anEnum))
      return false
    const compare = Array.from(Array(length(anEnum)).keys())
    return values(anEnum).every((v, i) => v === compare[i])
  }
}
