# TS Utilities

This is a repo with utility functions and definitions for my TypeScript projects. No guarantees.

## Base Types

### `KeySet<T>`
Represents a set of keys from an object of type `T`, Useful for giving intellisense a helping hand.

```typescript
interface Foo {
    bar: string
    baz: number
    quux: boolean
}

function thing(keys: KeySet<Foo>) { ... }
// intellisense will offer 'bar' | 'baz' | 'quux'
```

### `WithLength`
Represents an object that has a `length` property

```typescript
function thing(object: WithLength) {
    object.// intellisense will offer 'length'
}
```

### `Nullable<T>`
Represents a value that can possibly be `null` or `undefined`. Useful for annotating function arguments or return values that may not exist.
```typescript
function thing(value: Nullable<string>) { ... }
```

## Function Types
Function typings are a succinct way of defining functions, and make documenting more clear. Most these names are analagous to the funtional interfaces of Java 8.

```typescript
// Normally, you'd define a function argument like this
function foo(callback: (value: string) => string) { ... }

// That's hard to read with intellisense. The above can be written like this:
function foo(callback: UnaryOperator<string>) { ... }
```

### `VoidFunction`
Represents a function that takes no arguments and returns no data.
```typescript
() => void
```

### `Function<T, U>`
Represents a function that accepts one argument `T` and produces a result `U`.
```typescript
(value: T) => U
```

### `NullableFunction<T, U>`
Represents a function that accepts one argument `T` and produces a result `U` that may be null or undefinded.
```typescript
(value: T) => Nullable<U>
```

### `OptionalFunction<T, U>`
Represents a function that accepts one optional/nullable argument `T?` and produces a result `U`.
```typescript
(value?: T) => U
```

### `BiFunction<T, U, R>`
Represents a function that accepts two arguments `T`, `U` and produces a result `R`.
```typescript
(value1: T, value2: U) => R
```

### `NullableBiFunction<T, U, R>`
Represents a function that accepts two arguments `T`, `U` and produces a result `R` that may be null or undefined.
```typescript
(value1: T, value2: U) => Nullable<R>
```

### `OptionalBiFunction<T, U, R>`
Represents a function that accepts two optional arguments `T?`, `U?` and produces a result `R`.
```typescript
(value1?: T, value2?: U) => R
```

### `Supplier<T>`
Represents a supplier of a result `T`.
```typescript
() => T
```

### `NullableSupplier<T>`
Represents a supplier of a result `T` that may be null or undefined.
```typescript
() => Nullable<T>
```

### `AsyncSupplier<T>`
Represents a supplier of a promise of type `T`. Analagous to `Supplier<Promise<T>>`
```typescript
() => Promise<T>
```

### `NullableAsyncSupplier<T>`
Represents a supplier of a promise of type `T` whose resolved value maybe null or undefined. Analagous to `NullableSupplier<Promise<T>>`
```typescript
() => Promise<Nullable<T>>
```

### `BiSupplier<T, U>`
Represents a supplier of two results as a tuple of `[T, U]`.
```typescript
() => [T, U]
```

### `Consumer<T>`
Represents an operation that accepts a single input argument `T` and returns no result. Useful for defining event handlers
```typescript
(value: T) => void
```

### `OptionalConsumer<T>`
Represents an operation that accepts a single optional/nullable input argument `T` and returns no result.
```typescript
(value?: T) => void
```

### `BiConsumer<T, U>`
Represents an operation that accepts two input arguments `T`, `U` and returns no result.
```typescript
(value1: T, value2: U) => void
```

### `OptionalBiConsumer<T, U>`
Represents an operation that accepts a optional arguments, `T`, `U` and returns no result.
```typescript
(value1?: T, value2?: U) => void
```

### `UnaryOperator<T>`
Represents an operation on a single operand that produces a result of the same `T` type as its operand. Analagous to `Function<T, T>`
```typescript
(value: T) => T
```

### `BinaryOperator<T>`
Represents an operation upon two operands of the same type `T`, producing a result of the same type as the operands. Analagous to `Function<T, T, T>`
```typescript
(value1: T, value2: T) => T
```

### `Predicate<T>`
Represents a predicate (boolean-valued function) of one argument `T`.
```typescript
(value: T) => boolean
```

### `BiPredicate<T, U>`
Represents a predicate (boolean-valued function) of two arguments `T`
```typescript
(value1: T, value2: U) => boolean
```

### `Comparator<T>`
Represents a comparison operation of two operands of type `T`. Analagous to `BiFunction<T, T, number>`. Useful for custom sorting operations.
```typescript
(value1: T, value2: T) => number
```

### `EqualityOperator<T>`
Represents an operation that compares two operands of the same type `T` and produces a boolean result for comparison purposes. Analagous to `BiFunction<T, T, boolean>`
```typescript
(value1: T, value2: T) => boolean
```
---

## `Functions` namespace
The function namespace contains a few utility functions

### `Functions.coerceBoolean`
```typescript
(value: any) => boolean
```
Takes a value of `any` type and coerces it into a boolean value. If a string is passed, the function will return true if the string equals a case-insentive `true`, othwerwise it will return false. If any other type besides `String` is passed, a double-negation operation is performed on the operand. This is useful for use in lambda functions to keep code more succinct. Extrememly useful for filtering falsey values from arrays.

```typescript
// Standard way that doesn't account for a string value of `true`
foo('bar', x => !!x)
// Standard way that accounts for a string value of `true`
foo('bar', x => typeof x === 'string' ? x.toLowerCase() === 'true' : !!x)
// Messy. Use coerceBoolean
foo('bar', Functions.coerceBoolean)
```

### `Functions.isTruthy`
```typescript
(value: any) => boolean
```
Returns true if a value evaluates to `true` after double negation. Analagous to using `(x => !!x)`, but represents a cleaner and more easy to read declarative code style.

### `Functions.isFalsey`
```typescript
(value: any) => boolean
```
Returns true if a value evaluates to `false` after single negation. Analagous to using `(x => !x)`, but represents a cleaner and more easy to read declarative code style.

### `Functions.noop`
```typescript
() => void
```
A function that takes no arguments, and produces no result. Useful for times when you're required to pass a function argument, but don't care about the result.

### `Functions.noopAsync`
```typescript
() => Promise<void>
```
As with `noop`, this function takes no arguments, but produces a `Promise` of type `void` that immediately resolves. Not especially useful, except to appease the Typescript compiler in certain cases where you don't care about an asynchronous result, but still must pass an asynchronous function consumer.

### `Functions.noopAsyncReject`
```typescript
() => Promise<never>
```
The same as `noopAsync`, but instead of resolving, it rejects.

---

## `Enum` namespace
Enums in Typescript are fun to use, but come with some restrictions out of the box. The `Enum` namespace exposes functions to read keys and values from your enum objects, and gather additional information about them.

### `Enum.keys`
```typescript
(anEnum: object) => string[]
```
Gets the keys (labels) of an enum as an array of strings

```typescript
// String values
enum Color {
    Red = '#FF0000',
    Green = '#00FF00',
    Blue = '#0000FF'
}

Enum.keys(Color)
// ['Red', 'Green', 'Blue']
```

### `Enum.values`
```typescript
<T>(anEnum: object) => T[]
```
Gets the values of an enum, either an array of strings or numbers.

```typescript
// String values
enum Color {
    Red = '#FF0000',
    Green = '#00FF00',
    Blue = '#0000FF'
}

Enum.values(Color)
// ['#FF0000', '#00FF00', '#0000FF']

// Sequential numeric values
enum Status {
    Pending,
    Resolved,
    Rejected
}

Enum.values(Status)
// [0, 1, 2]

// Defined numeric values
enum StatusCode {
    OK = 200,
    BadRequest = 400,
    NotFound = 404,
    ServerError = 500
}

Enum.values(StatusCode)
// [200, 400, 404, 500]
```

### `Enum.toObject`
```typescript
<T>(anEnum: object, type?: Enum.Type) => T[]
```
Returns an object representing the enum. For enums with string values, the enum is returned as-is, as it is already an object. Since enums with numeric values are keyed both by `label -> int` and `int -> label`, the expected key type (either number or string) can be provided. This defaults to `Enum.Type.Number`.

```typescript
// String values
enum Color {
    Red = '#FF0000',
    Green = '#00FF00',
    Blue = '#0000FF'
}

Enum.toObject(Color)
// { Red: '#FF0000', Green: '00FF00', Blue: '#0000FF' }

// Numeric values
enum Status {
    Pending,
    Resolved,
    Rejected
}

Enum.toObject(Status) // Enum.Type.Number as default
// { 0: 'Pending', 1: 'Resolved', 2: 'Rejected' }

Enum.toObject(Status, Enum.Type.String)
// { Pending: 0, Resolved: 1, Rejected: 2 }
```


### `Enum.length`
```typescript
(anEnum: object) => number
```
Returns the length (count) of the enum key/value pairs
```typescript
// String values
enum Color {
    Red = '#FF0000',
    Green = '#00FF00',
    Blue = '#0000FF'
}

Enum.length(Color)
// 3
```

### `Enum.isNumeric`
```typescript
(anEnum: object) => boolean
```
Returns true if an enum is of numeric values

```typescript
enum Color {
    Red = '#FF0000',
    Green = '#00FF00',
    Blue = '#0000FF'
}

enum Status {
    Pending,
    Resolved,
    Rejected
}

Enum.isNumeric(Color)  // false
Enum.isNumeric(Status) // true
```

### `Enum.isSequential`
```typescript
(anEnum: object) => boolean
```
Returns true if an enum is of numeric values ***and*** the numeric values are zero-based and sequential

```typescript
enum Status {
    Pending,
    Resolved,
    Rejected
}

enum Flags {
    FlagOne = 1,
    FlagTwo = 2,
    FlagThree = 4,
    FlagFour = 128
}

Enum.isSequential(Status) // true
Enum.isSequential(Flags)  // false
```

---

## `Futures` namespace
The `Futures` namespace contains functions that wrap the nastiness of `setTimeout` and allow cleaner code geared towards usage alongside `async/await`. 

### `async Futures.wait`
```typescript
async (ms: number) => Promise<void>
```
An asynchrounous function that waits for a given number of milliseconds `ms` and resolves. This is a convenience wrapper around `setTimeout`
```typescript
async function foo() {
    console.log('Before')
    await Futures.wait(1000)
    console.log('This prints one second later')
}
```

### `async Futures.delayed`
```typescript
async (ms: number, callback: VoidFunction) => Promise<void>
```

Delays execution of a function `callback` for a given amount of milliseconds `ms`. This is a Promise-based wrapper around `setTimeout`. Internally, this calls `Futures.wait`, then executes the callback function. Useful when using inside functions that can't be async, such as React's `useEffect` hook.

```typescript
function foo() {
    console.log('Before')
    Futures.delayed(1000, () => console.log('This prints one second later'))
}
```

### `async Futures.waitUntil`
```typescript
async (condition: AsyncSupplier<boolean>, waitInterval?: number) => Promise<void>
```
For usage in an `async` function, this will delay progression of the async function until the boolean result of `condition` resolves to true. If the supplier never resolves, the function will not continue. Internally, this uses `setInterval` to check the truthiness of the supplier's outcome. The default interval frequency is `1` millisecond, but can be changed to a more lazy frequency by passing a millisecond value to `waitInterval`.

```typescript
async function foo() {
    console.log('Before')
    await Futures.waitUntil(() => resourcesAreLoaded())
    console.log('This will print when resources are loaded')
}
```

### `async Futures.waitUntilResolved`
```typescript
async (timeout: number, condition: AsyncSupplier<boolean>, waitInterval?: number) => Promise<void>
```
This does the same thing as `Futures.waitUntil`, except that it takes a `timeout` in milliseconds as the first agument and will reject if the condition is not met before the timeout exhausts. Use inside of a `try/catch` block.

```typescript
async function foo() {
    console.log('Before')
    try {
        await Futures.waitUntilResolved(2000, () => resourcesAreLoaded())
        console.log('Resources loaded within 2 seconds')
    } catch {
        console.error('Resources were not loaded within 2 seconds')
    }
}
```
---

## `class Latchable<T>`
Produces an object that will latch onto a value of type `T`, and will lock the value, preventing it from being modified. Useful for a value that needs to be defined, but populated later, and is meant as a more secure way than using `let`, since the Latchable instance itself should be declared with `const`.

### `constructor`
```typescript
constructor(value?: T)
```
The constructor takes an optional value of its type `T`. If a value is provided, the value will be locked (latched) immediately, otherwise the value will bo locked when latched.

### `static Latchable.immutable`
```typescript
Latchable.immutable<T>(value?: T)
```
Creates a Latchable where the value will be frozen when supplied. If the value is supplied here via `Latchable.immutable`, it will lock and freeze immediately, otherwise it will lock and freeze the value when latched.

### `Latchable.latch`
```typescript
(value: T) => void
```
Latches the value of type `T` and locks the instance. If `latch` is called while the instance is locked, an error is thrown.

```typescript
const holder = new Latchable<number>()
try {
    doSomethingThatMayThrow()
    holder.latch(1)
} catch {
    holder.latch(2)
}
```

### `Latchable.value`
A getter for the current latched value

```typescript
const holder = new Latchable<number>()
...
holder.latch('foo')
console.log(holder.value) // 'foo'
```
---

## `class Lockable<T> extends Latchable<T>`
Similar to `Latchable<T>`, but can be locked and unlocked at will. Note that in 99% of instances, this class is not useful given the asynchronous nature of Javascript, but one instance this proved useful was when dealing with `localStorage` or `sessionStorage` in an Electron application that used multiple browser windows. These storage mechanisms where bound to the `window` object for each window, and synchronizing the values and preventing asynchrnous client-side Javascript from writing different values in different windows was mitigated using `Lockable`.


### `Lockable.value`
see `Latchable.value`

### `Lockable.latch`
see `Latchable.latch`

Since Lockable extends Latchable, it uses the `latch` method to latch the value and lock it. With `Lacthable`, the value can never be changed or unlocked once latched (hence the name 'latch'). `Lockable`, on the other hand can lock and unlock the value when needed, and the internal value can be changed by using either the `set` or `offer` method.

### `Lockable.set`
```typescript
(value: T) => void
```
Sets the value synchronously without locking. Will throw an error if attempting to set the value while locked. Use `set` when unsure about which branch a piece of code will take.

```typescript
const holder = new Lockable<number>(0)
try {
    doSomethingThatMayThrow()
    holder.set(1)
} catch {
    holder.set(2)
} finally {
    holder.lock()
}
```

### `async Lockable.offer`
```typescript
async (value: T, timeout?: number) => void
```
Attempts to set the value while the value is possibly locked, and will wait until the value has been unlocked before setting the new value. An optional `timeout` can be provided to limit how long it should wait before throwing an error. Should be used inside a `try/catch` block. If no timeout is provided and the instance never unlocks, this will never resolve and the host function will not continue.

### `Lockable.lock`
```typescript
() => void
```
Locks the value

### `Lockable.unlock`
```typescript
() => void
```

Unlocks the value