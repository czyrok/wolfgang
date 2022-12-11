import { MapParamModel } from '../../../../../param/map/model/map.param.model'
import { ItemLoopGameModel } from '../../model/item.loop.game.model'

import { TypeItemLoopGameEnum } from '../../type/enum/type.item.loop.game.enum'

import { TestItemLoop } from '../../../../../test'

export class FactoryItemLoopGameUtil {
    private static _storage: MapParamModel<ItemLoopGameModel> = new MapParamModel

    private static get storage(): MapParamModel<ItemLoopGameModel> {
        return this._storage
    }

    public static get(type: TypeItemLoopGameEnum): ItemLoopGameModel {
        if (type === TypeItemLoopGameEnum.TEST) {
            this.storage[type] = new TestItemLoop()
        }

        return this.storage[type] as ItemLoopGameModel
    }
}