export interface IteratorChainedListInterface<T> {
    [Symbol.iterator](): IterableIterator<T>
    get current(): T
    next(): T
}