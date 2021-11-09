import { Nullable } from '.'

/**
 * Represents a function that takes no arguments and returns no data
 */
export type VoidFunction = () => void

/**
 * Represents a function that accepts one argument and produces a result.
 * @template T the parameter type
 * @template U the return type
 */
export type Function<T, U> = (value: T) => U

/**
 * Represents a function that accepts one argument and produces a result asynchronously.
 * @template T the parameter type
 * @template U the return type
 */
export type AsyncFunction<T, U> = (value: T) => Promise<U>

/**
 * Represents a function that accepts one argument and produces a result
 * that may be null or undefined.
 * @template T the parameter type
 * @template U the return type
 */
export type NullableFunction<T, U> = (value: T) => Nullable<U>

/**
 * Represents a function that accepts one optional argument and produces a result.
 * @template T the parameter type
 * @template U the return type
 */
export type OptionalFunction<T, U> = (value?: T) => U

/**
 * Represents a function that accepts two arguments and produces a result.
 * @template T the first argument type
 * @template U the second argument type
 * @template R the return type
 */
export type BiFunction<T, U, R> = (value1: T, value2: U) => R

/**
 * Represents a function that accepts two arguments and produces a result
 * that may be null or undefined.
 * @template T the first argument type
 * @template U the second argument type
 * @template R the return type
 */
export type NullableBiFunction<T, U, R> = (value1: T, value2: U) => Nullable<R>

/**
 * Represents a function that accepts two optional arguments and produces a result.
 * @template T the first argument type
 * @template U the second argument type
 * @template R the return type
 */
export type OptionalBiFunction<T, U, R> = (value1?: T, value2?: U) => R

/**
 * Represents a supplier of a result.
 * @template T the return type
 */
export type Supplier<T> = () => T

/**
 * Represents a supplier of a result that may be null or undefined.
 * @template T the return type
 */
export type NullableSupplier<T> = () => Nullable<T>

/**
 * Represents a supplier of a promise.
 * @template T the return type
 */
export type AsyncSupplier<T> = () => Promise<T>

/**
 * Represents a supplier of a promise whose resolved value may be
 * null or undefinded.
 * @template T the return type
 */
export type NullableAsyncSupplier<T> = () => Promise<Nullable<T>>

/**
 * Represents a supplier of two results as a tuple.
 * @template T the first return type
 * @template U the second return type
 */
export type BiSupplier<T, U> = () => [T, U]

/**
 * Represents an operation that accepts a single input argument
 * and returns no result.
 * @template T the argument type
 */
export type Consumer<T> = (value: T) => void

/**
 * Represents an operation that accepts a single optional input argument
 * and returns no result.
 * @template T the argument type
 */
export type OptionalConsumer<T> = (value?: T) => void

/**
 * Represents an operation that accepts two input arguments and returns no result.
 * @template T the first argument type
 * @template U the second argument type
 */
export type BiConsumer<T, U> = (value1: T, value2: U) => void

/**
 * Represents an operation that accepts a optional arguments and returns no result.
 * @template T the first argument type
 * @template U the second argument type
 */
export type OptionalBiConsumer<T, U> = (value1?: T, value2?: U) => void

/**
 * Represents an operation on a single operand that produces a
 * result of the same type as its operand.
 * @template T the type of the parameter and return type
 */
export type UnaryOperator<T> = (value: T) => T

/**
 * Represents an operation upon two operands of the same type,
 * producing a result of the same type as the operands.
 * @template T the type of the parameter and return type
 */
export type BinaryOperator<T> = (value1: T, value2: T) => T

/**
 * Represents a predicate (boolean-valued function) of one argument.
 * @template T the argument type
 */
export type Predicate<T> = (value: T) => boolean

/**
 * Represents a predicate (boolean-valued function) of two arguments.
 * @template T the first argument type
 * @template U the second argument type
 */
export type BiPredicate<T, U> = (value1: T, value2: U) => boolean

/**
 * Represents an operation that compares two operands of the same type
 * and produces a number (integer) for comparison purposes
 * @template T the argument type
 */
export type Comparator<T> = BiFunction<T, T, number>

/**
 * Represents an operation that compares two operands of the same type
 * and produces a boolean result for comparison purposes
 * @template T the argument type
 */
export type EqualityOperator<T> = BiFunction<T, T, boolean>

export namespace Functions {

  /**
   * Coerces any value into a boolean value. If the value is a string,
   * it will return true only if the string's value is true (case-insensitive)
   *
   * @export
   * @param {*} value
   * @return {*}  {boolean}
   */
  export function coerceBoolean(value: any): boolean {
    if (typeof value == 'string')
      return value.toLowerCase() == 'true'
    return !!value
  }

  /**
   * Checks if a value is truthy
   *
   * @export
   * @param {*} value the value to test
   * @return {*}  {boolean}
   */
  export function isTruthy(value: any): boolean {
    return !!value
  }

  /**
   * Checks if a value is falsey
   *
   * @export
   * @param {*} value the value to test
   * @return {*}  {boolean}
   */
  export function isFalsey(value: any): boolean {
    return !value
  }

  /**
   * A function that takes no arguments and returns no result
   *
   * @export
   */
  export function noop() {
  }

  /**
   * A noop function that immediately resolves a promise. Useful for
   * appeasing the TS compiler when a value is expected to be a Promise
   *
   * @export
   * @returns {Promise<void>}
   */
  export function noopAsync(): Promise<void> {
    return Promise.resolve()
  }
}
