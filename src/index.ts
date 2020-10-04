export * from './Enum'
export * from './Functions'
export * from './Futures'
export * from './Lockable'

export type KeySet<T> = (keyof T)[]
export type WithLength = { length: number }
