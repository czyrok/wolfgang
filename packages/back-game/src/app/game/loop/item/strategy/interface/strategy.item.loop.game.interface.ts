import { ContextParamBehaviorCardItemLoopGameModel } from '../../card/behavior/param/context/model/context.param.behavior.card.item.loop.game.model'
import { ContextParamItemLoopGameModel } from '../../param/context/model/context.param.item.loop.game.model'

import { CallbackContextParamItemLoopGameType } from '../../param/context/callback/type/callback.context.param.item.loop.game.type'
import { ResultSetItemLoopGameType } from '../../set/result/type/result.set.item.loop.game.type'

export interface StrategyItemLoopGameInterface<
    T extends ContextParamItemLoopGameModel,
    C extends ContextParamItemLoopGameModel | ContextParamBehaviorCardItemLoopGameModel
> {
    execute(context: T): void
    buildContext(
        parentContext: T,
        callback: CallbackContextParamItemLoopGameType,
        result?: ResultSetItemLoopGameType
    ): C
}