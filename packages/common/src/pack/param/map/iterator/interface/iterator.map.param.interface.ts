export interface IteratorMapParamInterface<T, C> {
    [key: string]: T | ((...keys: Array<string>) => void) | ((parent: C) => void)
    [Symbol.iterator](): IterableIterator<[string, T]>
}