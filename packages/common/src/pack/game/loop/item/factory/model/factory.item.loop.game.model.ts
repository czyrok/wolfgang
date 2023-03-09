import { FactoryGameModel } from '../../../../factory/model/factory.game.model'
import { ItemLoopGameModel } from '../../model/item.loop.game.model'

import { TypeItemLoopGameEnum } from '../../type/enum/type.item.loop.game.enum'

export class FactoryItemLoopGameModel extends FactoryGameModel<TypeItemLoopGameEnum, ItemLoopGameModel> {
    private static _instance: FactoryGameModel<TypeItemLoopGameEnum, ItemLoopGameModel> = new FactoryGameModel

    public static get instance(): FactoryGameModel<TypeItemLoopGameEnum, ItemLoopGameModel> {
        return this._instance
    }
}