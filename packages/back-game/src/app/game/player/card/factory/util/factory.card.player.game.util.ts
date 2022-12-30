import { CardPlayerGameModel, MapParamModel } from 'common'

import { GreyWerewolfImplementationCardPlayerGameModel } from '../../implementation/werewolf/grey/model/grey.werewolf.implementation.card.player.game.model'
import { VillagerImplementationCardPlayerGameModel } from '../../implementation/villager/model/villager.implementation.card.player.game.model'

import { TypeCardPlayerGameEnum } from '../../type/enum/type.card.player.game.enum'

export class FactoryCardPlayerGameUtil {
    private static _storage: MapParamModel<CardPlayerGameModel> = new MapParamModel

    private static get storage(): MapParamModel<CardPlayerGameModel> {
        return this._storage
    }

    public static get(type: TypeCardPlayerGameEnum): CardPlayerGameModel {
        if (this.storage[type] === undefined) {
            switch (type) {
                case TypeCardPlayerGameEnum.GREY_WEREWOLF:
                    this.storage[type] = new GreyWerewolfImplementationCardPlayerGameModel()

                    break
                case TypeCardPlayerGameEnum.VILLAGER:
                    this.storage[type] = new VillagerImplementationCardPlayerGameModel()

                    break
            }
        }

        return this.storage[type] as CardPlayerGameModel
    }
}