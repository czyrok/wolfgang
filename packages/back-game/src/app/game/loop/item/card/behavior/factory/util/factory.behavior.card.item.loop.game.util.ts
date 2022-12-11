import { MapParamModel } from '../../../../../../../param/map/model/map.param.model'
import { BehaviorCardItemLoopGameModel } from '../../model/behavior.card.item.loop.game.model'

import { TypeBehaviorCardItemLoopGameEnum } from '../../type/enum/type.behavior.card.item.loop.game.enum'

import { TestBehaviorCardItemLoop } from '../../../../../../../test'

export class FactoryCardBehaviorItemLoopGameUtil {
    private static _storage: MapParamModel<BehaviorCardItemLoopGameModel> = new MapParamModel

    private static get storage(): MapParamModel<BehaviorCardItemLoopGameModel> {
        return this._storage
    }

    public static get(type: TypeBehaviorCardItemLoopGameEnum): BehaviorCardItemLoopGameModel {
        if (type === TypeBehaviorCardItemLoopGameEnum.TEST) {
            this.storage[type] = new TestBehaviorCardItemLoop()
        }

        return this.storage[type] as BehaviorCardItemLoopGameModel
    }
}