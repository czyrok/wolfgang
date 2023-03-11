export interface StorageMapParamInterface<T, C> {
    has(...keys: Array<C>): void
    setHeritage(parent: T): void
}