import { KeyNotFoundMapParamError } from '../key-not-found/error/key-not-found.map.param.error'

export class MapParamModel {
    [key: string]: any

    public has(...keys: Array<string>): void {
        const currentKeys: Array<string> = Object.keys(this)

        for (let key of keys) {
            if (currentKeys.indexOf(key) == -1) {
                throw new KeyNotFoundMapParamError(key)
            }
        }
    }

    public setHeritage(parent: MapParamModel) {
        const parentKeys: Array<string> = Object.keys(parent)

        for (let key of parentKeys) {
            this[key] = parent[key]
        }
    }
}