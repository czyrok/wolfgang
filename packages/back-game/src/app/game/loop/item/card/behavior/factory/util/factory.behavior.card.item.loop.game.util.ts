import { MapParamModel } from '../../../../../../../param/map/model/map.param.model'
import { BehaviorCardItemLoopGameModel } from '../../model/behavior.card.item.loop.game.model'
import { WerewolfImplementationBehaviorCardItemLoop } from '../../implementation/werewolf/model/werewolf.implementation.behavior.card.item.loop.game.model'
import { VillagerImplementationBehaviorCardItemLoop } from '../../implementation/villager/model/villager.implementation.behavior.card.item.loop.game.model'

import { TypeBehaviorCardItemLoopGameEnum } from '../../type/enum/type.behavior.card.item.loop.game.enum'

export class FactoryCardBehaviorItemLoopGameUtil {
    private static _storage: MapParamModel<BehaviorCardItemLoopGameModel> = new MapParamModel

    private static get storage(): MapParamModel<BehaviorCardItemLoopGameModel> {
        return this._storage
    }

    public static get(type: TypeBehaviorCardItemLoopGameEnum): BehaviorCardItemLoopGameModel {
        if (this.storage[type] === undefined) {
            switch (type) {
                case TypeBehaviorCardItemLoopGameEnum.WEREWOLF:
                    this.storage[type] = new WerewolfImplementationBehaviorCardItemLoop()

                    break
                case TypeBehaviorCardItemLoopGameEnum.VILLAGER:
                    this.storage[type] = new VillagerImplementationBehaviorCardItemLoop()

                    break
            }
        }

        return this.storage[type] as BehaviorCardItemLoopGameModel
    }
}