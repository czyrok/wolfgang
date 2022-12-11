import { ContextParamBehaviorCardItemLoopGameModel } from '../../param/context/model/context.param.behavior.card.item.loop.game.model'

import { StrategyBehaviorCardPItemLoopGameInterface } from '../interface/strategy.behavior.card.item.loop.game.interface'

import { ResultSetItemLoopGameType } from '../../../../set/result/type/result.set.item.loop.game.type'

export abstract class StrategyBehaviorCardPItemLoopGameModel implements StrategyBehaviorCardPItemLoopGameInterface<ContextParamBehaviorCardItemLoopGameModel> {
    abstract entryPoint(context: ContextParamBehaviorCardItemLoopGameModel): void

    buildContext(
        parentContext: ContextParamBehaviorCardItemLoopGameModel,
        preivousResult?: ResultSetItemLoopGameType
    ): ContextParamBehaviorCardItemLoopGameModel {
        return new ContextParamBehaviorCardItemLoopGameModel(
            parentContext.timer,
            parentContext.timerMode,
            parentContext.players,
            parentContext,
            preivousResult
        )
    }
}