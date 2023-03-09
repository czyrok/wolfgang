import { FactoryGameModel } from '../../../factory/model/factory.game.model'
import { CardGameModel } from '../../model/card.game.model'

import { TypeCardGameEnum } from '../../type/enum/type.card.game.enum'

export class FactoryCardGameModel extends FactoryGameModel<TypeCardGameEnum, CardGameModel> {
    private static _instance: FactoryGameModel<TypeCardGameEnum, CardGameModel> = new FactoryGameModel

    public static get instance(): FactoryGameModel<TypeCardGameEnum, CardGameModel> {
        return this._instance
    }
}