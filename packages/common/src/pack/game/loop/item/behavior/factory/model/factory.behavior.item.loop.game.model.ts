import { FactoryGameModel } from '../../../../../factory/model/factory.game.model'
import { BehaviorItemLoopGameModel } from '../../model/behavior.item.loop.game.model'

import { TypeBehaviorItemLoopGameEnum } from '../../type/enum/type.behavior.item.loop.game.enum'

export class FactoryBehaviorItemLoopGameModel extends FactoryGameModel<TypeBehaviorItemLoopGameEnum, BehaviorItemLoopGameModel> {
    private static _instance: FactoryGameModel<TypeBehaviorItemLoopGameEnum, BehaviorItemLoopGameModel> = new FactoryGameModel

    public static get instance(): FactoryGameModel<TypeBehaviorItemLoopGameEnum, BehaviorItemLoopGameModel> {
        return this._instance
    }
}