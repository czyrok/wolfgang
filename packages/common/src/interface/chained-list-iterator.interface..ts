export interface ChainedListIteratorInterface<T> {
    current(): T
    next(): T
}