import { FactoryCardBehaviorItemLoopGameUtil } from '../../../card/behavior/factory/util/factory.behavior.card.item.loop.game.util'
import { FactoryItemLoopGameUtil } from '../../../factory/util/factory.item.loop.game.util'

import { OneItemLoopGameModel } from '../../../one/model/one.item.loop.game.model'

import { TypeBehaviorCardItemLoopGameEnum } from '../../../card/behavior/type/enum/type.behavior.card.item.loop.game.enum'
import { TypeItemLoopGameEnum } from '../../../type/enum/type.item.loop.game.enum'

export class DeathImplementationItemLoopGameModel extends OneItemLoopGameModel {
    public constructor() {
        super(false, FactoryCardBehaviorItemLoopGameUtil.get(TypeBehaviorCardItemLoopGameEnum.DEATH))
    }

    public objectBuildingEnd(): void {
        this.nextList.push(
            FactoryItemLoopGameUtil.get(TypeItemLoopGameEnum.VILLAGER),
            FactoryItemLoopGameUtil.get(TypeItemLoopGameEnum.WEREWOLF)
        )
    }
}