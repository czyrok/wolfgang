import { KeyNotFoundMapParamError } from '../key-not-found/error/key-not-found.map.param.error'

import { IteratorMapParamInterface } from '../iterator/interface/iterator.map.param.interface'
import { StorageMapParamInterface } from '../storage/interface/storage.map.param.interface'

export class MapParamModel<T> implements IteratorMapParamInterface<T, MapParamModel<T>>, StorageMapParamInterface<MapParamModel<T>, string> {
    [key: string]: T | ((...keys: Array<string>) => void) | ((parent: MapParamModel<T>) => void)

    *[Symbol.iterator](): IterableIterator<[string, T]> {
        const keys: Array<string> = Object.keys(this)

        if (keys.length > 0) {
            for (let i = 0; i < keys.length; i++) {
                yield [keys[i], this[keys[i]] as T]
            }
        }
    }

    has(...keys: Array<string>): void {
        const currentKeys: Array<string> = Object.keys(this)

        for (const key of keys) {
            if (currentKeys.indexOf(key) == -1) {
                throw new KeyNotFoundMapParamError(key)
            }
        }
    }

    setHeritage(parent: MapParamModel<T>): void {
        const currentKeys: Array<string> = Object.keys(this),
            parentKeys: Array<string> = Object.keys(parent)

        for (const key of parentKeys) {
            if (currentKeys.indexOf(key) == -1) this[key] = parent[key]
        }
    }
}