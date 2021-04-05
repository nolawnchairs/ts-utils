// Generated by dts-bundle-generator v5.3.0

export declare namespace Enum {
	enum Type {
		Number = "number",
		String = "string"
	}
	/**
	 * Gets an array of the enum values
	 *
	 * @export
	 * @template T type of key (string or number)
	 * @param {object} anEnum the enum object
	 * @returns {T[]} array of values
	 */
	function values<T = string | number>(anEnum: object): T[];
	/**
	 * Gets an array of the enum keys
	 *
	 * @export
	 * @param {object} anEnum the enum object
	 * @returns {string[]} array of keys
	 */
	function keys(anEnum: object): string[];
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
	function toObject(anEnum: object, keysAs?: Type): object;
	/**
	 * Gets the length of the enum's keys
	 *
	 * @export
	 * @param {object} anEnum the enum object
	 * @returns {number} count of elements
	 */
	function length(anEnum: object): number;
	/**
	 * Determine if an enum values are numeric
	 *
	 * @export
	 * @param {object} anEnum
	 * @return boolean
	 */
	function isNumeric(anEnum: object): boolean;
	/**
	 * Determine if an enum values are numeric and sequential
	 *
	 * @export
	 * @param {object} anEnum
	 * @return boolean
	 */
	function isSequential(anEnum: object): boolean;
}
/**
 * Represents a function that takes no arguments and returns no data
 */
export declare type VoidFunction = () => void;
/**
 * Represents a function that accepts one argument and produces a result.
 * @template T the parameter type
 * @template U the return type
 */
export declare type Function<T, U> = (value: T) => U;
/**
 * Represents a function that accepts one argument and produces a result asynchronously.
 * @template T the parameter type
 * @template U the return type
 */
export declare type AsyncFunction<T, U> = (value: T) => Promise<U>;
/**
 * Represents a function that accepts one argument and produces a result
 * that may be null or undefined.
 * @template T the parameter type
 * @template U the return type
 */
export declare type NullableFunction<T, U> = (value: T) => Nullable<U>;
/**
 * Represents a function that accepts one optional argument and produces a result.
 * @template T the parameter type
 * @template U the return type
 */
export declare type OptionalFunction<T, U> = (value?: T) => U;
/**
 * Represents a function that accepts two arguments and produces a result.
 * @template T the first argument type
 * @template U the second argument type
 * @template R the return type
 */
export declare type BiFunction<T, U, R> = (value1: T, value2: U) => R;
/**
 * Represents a function that accepts two arguments and produces a result
 * that may be null or undefined.
 * @template T the first argument type
 * @template U the second argument type
 * @template R the return type
 */
export declare type NullableBiFunction<T, U, R> = (value1: T, value2: U) => Nullable<R>;
/**
 * Represents a function that accepts two optional arguments and produces a result.
 * @template T the first argument type
 * @template U the second argument type
 * @template R the return type
 */
export declare type OptionalBiFunction<T, U, R> = (value1?: T, value2?: U) => R;
/**
 * Represents a supplier of a result.
 * @template T the return type
 */
export declare type Supplier<T> = () => T;
/**
 * Represents a supplier of a result that may be null or undefined.
 * @template T the return type
 */
export declare type NullableSupplier<T> = () => Nullable<T>;
/**
 * Represents a supplier of a promise.
 * @template T the return type
 */
export declare type AsyncSupplier<T> = () => Promise<T>;
/**
 * Represents a supplier of a promise whose resolved value may be
 * null or undefinded.
 * @template T the return type
 */
export declare type NullableAsyncSupplier<T> = () => Promise<Nullable<T>>;
/**
 * Represents a supplier of two results as a tuple.
 * @template T the first return type
 * @template U the second return type
 */
export declare type BiSupplier<T, U> = () => [T, U];
/**
 * Represents an operation that accepts a single input argument
 * and returns no result.
 * @template T the argument type
 */
export declare type Consumer<T> = (value: T) => void;
/**
 * Represents an operation that accepts a single optional input argument
 * and returns no result.
 * @template T the argument type
 */
export declare type OptionalConsumer<T> = (value?: T) => void;
/**
 * Represents an operation that accepts two input arguments and returns no result.
 * @template T the first argument type
 * @template U the second argument type
 */
export declare type BiConsumer<T, U> = (value1: T, value2: U) => void;
/**
 * Represents an operation that accepts a optional arguments and returns no result.
 * @template T the first argument type
 * @template U the second argument type
 */
export declare type OptionalBiConsumer<T, U> = (value1?: T, value2?: U) => void;
/**
 * Represents an operation on a single operand that produces a
 * result of the same type as its operand.
 * @template T the type of the parameter and return type
 */
export declare type UnaryOperator<T> = (value: T) => T;
/**
 * Represents an operation upon two operands of the same type,
 * producing a result of the same type as the operands.
 * @template T the type of the parameter and return type
 */
export declare type BinaryOperator<T> = (value1: T, value2: T) => T;
/**
 * Represents a predicate (boolean-valued function) of one argument.
 * @template T the argument type
 */
export declare type Predicate<T> = (value: T) => boolean;
/**
 * Represents a predicate (boolean-valued function) of two arguments.
 * @template T the first argument type
 * @template U the second argument type
 */
export declare type BiPredicate<T, U> = (value1: T, value2: U) => boolean;
/**
 * Represents an operation that compares two operands of the same type
 * and produces a number (integer) for comparison purposes
 * @template T the argument type
 */
export declare type Comparator<T> = BiFunction<T, T, number>;
/**
 * Represents an operation that compares two operands of the same type
 * and produces a boolean result for comparison purposes
 * @template T the argument type
 */
export declare type EqualityOperator<T> = BiFunction<T, T, boolean>;
export declare namespace Functions {
	/**
	 * Coerces any value into a boolean value. If the value is a string,
	 * it will return true only if the string's value is true (case-insensitive)
	 *
	 * @export
	 * @param {*} value
	 * @return {*}  {boolean}
	 */
	function coerceBoolean(value: any): boolean;
	/**
	 * Checks if a value is truthy
	 *
	 * @export
	 * @param {*} value the value to test
	 * @return {*}  {boolean}
	 */
	function isTruthy(value: any): boolean;
	/**
	 * Checks if a value is falsey
	 *
	 * @export
	 * @param {*} value the value to test
	 * @return {*}  {boolean}
	 */
	function isFalsey(value: any): boolean;
	/**
	 * A function that takes no arguments and returns no result
	 *
	 * @export
	 */
	function noop(): void;
	/**
	 * A noop function that immediately resolves a promise. Useful for
	 * appeasing the TS compiler when a value is expected to be a Promise
	 *
	 * @export
	 * @returns {Promise<void>}
	 */
	function noopAsync(): Promise<void>;
	/**
	 * A noop function where a Promise rejection is expected. Useful for
	 * appeasing the TS compiler when a value is exptected to be a Promise
	 *
	 * @export
	 * @return {Promise<never>}
	 */
	function noopAsyncReject(): Promise<never>;
}
/**
 * Futures is a namespace containing async functions
 * that serve as async/await wrappers around standard
 * setTimeout and setInterval functions
 */
export declare namespace Futures {
	/**
	 * Delay by a given amount of milliseconds. This is a
	 * Promise-based wrapper around setTimeout
	 *
	 * @export
	 * @param {number} ms the amount of milliseconds to wait
	 * @returns {Promise<void>}
	 */
	function wait(ms: number): Promise<void>;
	/**
	 * Delays execution of a function for a given amount of
	 * milliseconds. This is a Promise-based wrapper around
	 * setTimeout
	 *
	 * @export
	 * @param {number} ms the amount of milliseconds to wait
	 * @param {VoidFunction} callback
	 */
	function delayed(ms: number, callback: VoidFunction): Promise<void>;
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
	function waitUntil(condition: Supplier<boolean | Promise<boolean>>, waitInterval?: number): Promise<unknown>;
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
	function waitUntilResolved(timeout: number, condition: Supplier<boolean | Promise<boolean>>, waitInterval?: number): Promise<unknown>;
}
/**
 * A holder for a value that can be locked
 *
 * @export
 * @class Latchable
 * @template T the type of object to latch onto
 */
export declare class Latchable<T> {
	protected _value: T;
	protected _locked: boolean;
	private _isImmutable;
	constructor(value?: T);
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
	static immutable<T>(value?: T): Latchable<T>;
	/**
	 * Sets the value of the object and locks it
	 *
	 * @param {T} value the value to latch onto
	 * @memberof Latchable
	 */
	latch(value: T): void;
	/**
	 * The current value of the latched object
	 *
	 * @readonly
	 * @type {T}
	 * @memberof Latchable
	 */
	get value(): T;
}
export declare class Lockable<T> extends Latchable<T> {
	constructor(value?: T);
	/**
	 * Sets the value. Throws an error if attempting to set
	 * while locked
	 *
	 * @param {T} value the value to set
	 * @memberof Lockable
	 */
	set(value: T): void;
	/**
	 * Offer to set the value. Will wait until the value is unlocked,
	 * then will set the value. If a timeout is provided, the offer will
	 * reject if the value is not unlocked by the given timeout
	 *
	 * @param {T} value the value to set
	 * @param {number} [timeout] the amount of time in milliseconds to wait
	 * @memberof Lockable
	 */
	offer(value: T, timeout?: number): Promise<void>;
	/**
	 * Locks the value
	 *
	 * @memberof Lockable
	 */
	lock(): void;
	/**
	 * Unlocks the value
	 *
	 * @memberof Lockable
	 */
	unlock(): void;
}
export declare namespace Objects {
	/**
	 * Remove all object properties that are null or undefined,
	 * but retains falsey values such as empty strings or zero
	 *
	 * @export
	 * @param {Record<string, any>} input
	 * @returns {Record<string, any>}
	 */
	function nonNull<T = Record<string, any>>(input: T): Partial<T>;
	/**
	 * Remove all object properties that are undefined, but retains
	 * null properties and falsey values such as empty strings or zero
	 *
	 * @export
	 * @param {Record<string, any>} input
	 * @returns {Record<string, any>}
	 */
	function nonUndefined<T = Record<string, any>>(input: T): Partial<T>;
	/**
	 * Remove all object properties that are considered "falsey", which
	 * includes null, undefined, zero, false and empty strings, but retains
	 * empty arrays and objects
	 *
	 * @export
	 * @param {Record<string, any>} input
	 * @returns {Record<string, any>}
	 */
	function truthy<T = Record<string, any>>(input: T): Partial<T>;
	/**
	 * Remove all object properties that are empty (zero-length) strings, but retain
	 * all other values
	 *
	 * @export
	 * @param {Record<string, any>} input
	 * @returns {Record<string, any>}
	 */
	function nonEmptyStrings<T = Record<string, any>>(input: T): Partial<T>;
	/**
	 * Filter out specified properties with a list of keys
	 *
	 * @export
	 * @param input the input object
	 * @param keys the keys to omit
	 */
	function drop<T, K extends keyof T>(input: T, ...keys: K[]): Partial<T>;
}
export declare type KeySet<T> = (keyof T)[];
export declare type WithLength = {
	length: number;
};
export declare type Nullable<T> = T | null | undefined;

export {};
