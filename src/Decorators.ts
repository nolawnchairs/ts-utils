
type BindDecorator = (_: object, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor

/**
 * Binds a class method to its instance using "this"
 *
 * @export
 * @template T
 * @returns {BindDecorator<T>}
 */
export function Bind(): BindDecorator {
  return (_: object, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor => {
    // Shamelessly copied from https://github.com/NoHomey/bind-decorator/
    if (!descriptor || (typeof descriptor.value !== 'function')) {
      throw new TypeError(`Only methods can be decorated with @Bind. <${propertyKey}> is not a method!`)
    }

    return {
      configurable: true,
      get(this: any): any {
        const bound = descriptor.value!.bind(this)
        // Credits to https://github.com/andreypopp/autobind-decorator for memoizing the result of bind against a symbol on the instance.
        Object.defineProperty(this, propertyKey, {
          value: bound,
          configurable: true,
          writable: true
        })
        return bound
      }
    }
  }
}
