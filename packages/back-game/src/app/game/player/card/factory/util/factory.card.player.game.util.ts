import { MapParamModel } from '../../../../../param/map/model/map.param.model'
import { CardPlayerGameModel } from '../../model/card.player.game.model'

import { TypeCardPlayerGameEnum } from '../../type/enum/type.card.player.game.util'

import { TestCardPlayer } from '../../../../../test'

export class FactoryCardPlayerGameUtil {
    private static _storage: MapParamModel<CardPlayerGameModel> = new MapParamModel

    private static get storage(): MapParamModel<CardPlayerGameModel> {
        return this._storage
    }

    public static get(type: TypeCardPlayerGameEnum): CardPlayerGameModel {
        if (type === TypeCardPlayerGameEnum.TEST) {
            this.storage[type] = new TestCardPlayer()
        }

        return this.storage[type] as CardPlayerGameModel
    }
}