import { InitFactoryRegistering } from '../../../../../factory/decorator/factory.game.decorator'

import { OneItemLoopGameModel } from '../../../one/model/one.item.loop.game.model'

import { TypeItemLoopGameEnum } from '../../../type/enum/type.item.loop.game.enum'
import { TypeBehaviorItemLoopGameEnum } from '../../../behavior/type/enum/type.behavior.item.loop.game.enum'

@InitFactoryRegistering()
export class VillagerImplementationItemLoopGameModel extends OneItemLoopGameModel {
    public constructor() {
        super({
            type: TypeItemLoopGameEnum.VILLAGER,
            atNight: false,
            behaviorTypeList: [
                TypeBehaviorItemLoopGameEnum.VILLAGER
            ],
            next: [
                TypeItemLoopGameEnum.DEATH
            ]
        })
    }
}