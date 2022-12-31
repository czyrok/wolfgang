import { FactoryCardBehaviorItemLoopGameUtil } from '../../../card/behavior/factory/util/factory.behavior.card.item.loop.game.util'
import { FactoryItemLoopGameUtil } from '../../../factory/util/factory.item.loop.game.util'

import { OneItemLoopGameModel } from '../../../one/model/one.item.loop.game.model'

import { TypeItemLoopGameEnum } from '../../../type/enum/type.item.loop.game.enum'
import { TypeBehaviorCardItemLoopGameEnum } from '../../../card/behavior/type/enum/type.behavior.card.item.loop.game.enum'

export class WerewolfImplementationItemLoopGameModel extends OneItemLoopGameModel {
    public constructor() {
        super(true, FactoryCardBehaviorItemLoopGameUtil.get(TypeBehaviorCardItemLoopGameEnum.WEREWOLF))
    }

    public objectBuildEnding(): void {
        if (!this.isInitialized) {
            this.nextList.push(
                FactoryItemLoopGameUtil.get(TypeItemLoopGameEnum.DEATH)
            )

            this.isInitialized = true
        }
    }
}