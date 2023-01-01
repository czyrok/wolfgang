import { InitFactoryRegistering } from '../../../../../factory/decorator/factory.game.decorator'

import { OneItemLoopGameModel } from '../../../one/model/one.item.loop.game.model'

import { TypeItemLoopGameEnum } from '../../../type/enum/type.item.loop.game.enum'
import { TypeBehaviorCardItemLoopGameEnum } from '../../../card/behavior/type/enum/type.behavior.card.item.loop.game.enum'

@InitFactoryRegistering()
export class DeathImplementationItemLoopGameModel extends OneItemLoopGameModel {
    public constructor() {
        super({
            type: TypeItemLoopGameEnum.DEATH,
            atNight: false,
            behaviorTypeList: [
                TypeBehaviorCardItemLoopGameEnum.DEATH
            ],
            next: [
                TypeItemLoopGameEnum.VILLAGER,
                TypeItemLoopGameEnum.WEREWOLF,
            ]
        })
    }
}