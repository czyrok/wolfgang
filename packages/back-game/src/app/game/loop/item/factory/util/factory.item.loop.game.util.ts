import { MapParamModel } from '../../../../../param/map/model/map.param.model'
import { ItemLoopGameModel } from '../../model/item.loop.game.model'
import { VillagerImplementationItemLoopGameModel } from '../../implementation/villager/model/villager.implementation.item.loop.game.model'
import { WerewolfImplementationItemLoopGameModel } from '../../implementation/werewolf/model/werewolf.implementation.item.loop.game.model'

import { TypeItemLoopGameEnum } from '../../type/enum/type.item.loop.game.enum'

export class FactoryItemLoopGameUtil {
    private static _storage: MapParamModel<ItemLoopGameModel> = new MapParamModel

    private static get storage(): MapParamModel<ItemLoopGameModel> {
        return this._storage
    }

    public static get(type: TypeItemLoopGameEnum): ItemLoopGameModel {
        if (this.storage[type] === undefined) {
            switch (type) {
                case TypeItemLoopGameEnum.DEFAULT:
                    return this.get(TypeItemLoopGameEnum.WEREWOLF)
                case TypeItemLoopGameEnum.WEREWOLF:
                    this.storage[type] = new WerewolfImplementationItemLoopGameModel()

                    break
                case TypeItemLoopGameEnum.VILLAGER:
                    this.storage[type] = new VillagerImplementationItemLoopGameModel()

                    break
            }
        }

        return this.storage[type] as ItemLoopGameModel
    }
}