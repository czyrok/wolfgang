import { InitFactoryRegistering } from '../../../../../factory/decorator/factory.game.decorator'

import { OneItemLoopGameModel } from '../../../one/model/one.item.loop.game.model'

import { TypeItemLoopGameEnum } from '../../../type/enum/type.item.loop.game.enum'
import { TypeBehaviorItemLoopGameEnum } from '../../../behavior/type/enum/type.behavior.item.loop.game.enum'

@InitFactoryRegistering()
export class WerewolfImplementationItemLoopGameModel extends OneItemLoopGameModel {
    public constructor() {
        super({
            type: TypeItemLoopGameEnum.WEREWOLF,
            atNight: true,
            behaviorTypeList: [
                TypeBehaviorItemLoopGameEnum.WEREWOLF
            ],
            next: [
                TypeItemLoopGameEnum.DEATH
            ]
        })
    }
}