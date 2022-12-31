import { MapParamModel } from '../../../../param/map/model/map.param.model'
import { CardGameModel } from '../../model/card.game.model'
import { GreyWerewolfImplementationCardPlayerGameModel } from '../../implementation/werewolf/grey/model/grey.werewolf.implementation.card.player.game.model'
import { VillagerImplementationCardPlayerGameModel } from '../../implementation/villager/model/villager.implementation.card.player.game.model'

import { TypeCardGameEnum } from '../../type/enum/type.card.game.enum'

export class FactoryCardGameUtil {
    private static _storage: MapParamModel<CardGameModel> = new MapParamModel

    private static get storage(): MapParamModel<CardGameModel> {
        return this._storage
    }

    public static get(type: TypeCardGameEnum): CardGameModel {
        if (this.storage[type] === undefined) {
            switch (type) {
                case TypeCardGameEnum.GREY_WEREWOLF:
                    this.storage[type] = new GreyWerewolfImplementationCardPlayerGameModel()

                    break
                case TypeCardGameEnum.VILLAGER:
                    this.storage[type] = new VillagerImplementationCardPlayerGameModel()

                    break
            }
        }

        return this.storage[type] as CardGameModel
    }
}