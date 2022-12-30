import { TypeBehaviorCardItemLoopGameEnum, MapParamModel } from 'common'

import { BehaviorCardItemLoopGameModel } from '../../model/behavior.card.item.loop.game.model'
import { WerewolfImplementationBehaviorCardItemLoopGameModel } from '../../implementation/werewolf/model/werewolf.implementation.behavior.card.item.loop.game.model'
import { VillagerImplementationBehaviorCardItemLoopGameModel } from '../../implementation/villager/model/villager.implementation.behavior.card.item.loop.game.model'
import { DeathImplementationBehaviorCardItemLoopGameModel } from '../../implementation/death/model/death.implementation.behavior.card.item.loop.game.model'

export class FactoryCardBehaviorItemLoopGameUtil {
    private static _storage: MapParamModel<BehaviorCardItemLoopGameModel> = new MapParamModel

    private static get storage(): MapParamModel<BehaviorCardItemLoopGameModel> {
        return this._storage
    }

    public static get(type: TypeBehaviorCardItemLoopGameEnum): BehaviorCardItemLoopGameModel {
        if (this.storage[type] === undefined) {
            switch (type) {
                case TypeBehaviorCardItemLoopGameEnum.WEREWOLF:
                    this.storage[type] = new WerewolfImplementationBehaviorCardItemLoopGameModel()

                    break
                case TypeBehaviorCardItemLoopGameEnum.VILLAGER:
                    this.storage[type] = new VillagerImplementationBehaviorCardItemLoopGameModel()

                    break
                case TypeBehaviorCardItemLoopGameEnum.DEATH:
                    this.storage[type] = new DeathImplementationBehaviorCardItemLoopGameModel()

                    break
            }
        }

        return this.storage[type] as BehaviorCardItemLoopGameModel
    }
}