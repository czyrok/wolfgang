import { ContextParamBehaviorCardItemLoopGameModel } from '../../../card/behavior/param/context/model/context.param.behavior.card.item.loop.game.model'
import { ContextParamItemLoopGameModel } from '../../../param/context/model/context.param.item.loop.game.model'

import { ResultSetItemLoopGameType } from '../../../set/result/type/result.set.item.loop.game.type'

export interface BuildContextStrategyItemLoopGameInterface<
    T extends ContextParamItemLoopGameModel,
    C extends ContextParamItemLoopGameModel | ContextParamBehaviorCardItemLoopGameModel
> {
    buildContext(
        parentContext: T,
        preivousResult?: ResultSetItemLoopGameType
    ): C
}