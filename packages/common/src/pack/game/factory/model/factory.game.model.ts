import { NotExistFactoryGameError } from '../error/not-exist.factory.game.error'
import { AlreadyExistFactoryGameError } from '../error/already-exist.factory.game.error'

import { MapParamModel } from '../../../param/map/model/map.param.model'

export class FactoryGameModel<T, C> {
    private static _instance: FactoryGameModel<any, any> = new FactoryGameModel

    private _storage: MapParamModel<C> = new MapParamModel

    protected constructor() { }

    public static get instance(): FactoryGameModel<any, any> {
        return this._instance
    }

    private get storage(): MapParamModel<C> {
        return this._storage
    }

    public get(type: T): C {
        if (this.storage[type as string] === undefined) {
            throw new NotExistFactoryGameError(type as string)
        }

        return this.storage[type as string] as C
    }

    public getList(typeList: Array<T>): Array<C> {
        let list: Array<C> = new Array

        for (const type of typeList) {
            if (this.storage[type as string] === undefined) throw new NotExistFactoryGameError(type as string)

            list.push(this.storage[type as string] as C)
        }

        return list
    }

    public register(type: T, item: C): void {
        if (this.storage[type as string] === undefined) {
            this.storage[type as string] = item
        } else {
            throw new AlreadyExistFactoryGameError(type as string)
        }
    }
}