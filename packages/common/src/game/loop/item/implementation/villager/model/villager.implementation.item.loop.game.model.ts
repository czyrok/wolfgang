import { InitFactoryRegistering } from '../../../../../factory/decorator/factory.game.decorator'

import { OneItemLoopGameModel } from '../../../one/model/one.item.loop.game.model'

import { TypeItemLoopGameEnum } from '../../../type/enum/type.item.loop.game.enum'
import { TypeBehaviorCardItemLoopGameEnum } from '../../../card/behavior/type/enum/type.behavior.card.item.loop.game.enum'

@InitFactoryRegistering()
export class VillagerImplementationItemLoopGameModel extends OneItemLoopGameModel {
    public constructor() {
        super({
            type: TypeItemLoopGameEnum.VILLAGER,
            atNight: false,
            behaviorTypeList: [
                TypeBehaviorCardItemLoopGameEnum.VILLAGER
            ],
            next: [
                TypeItemLoopGameEnum.DEATH
            ]
        })
    }
}