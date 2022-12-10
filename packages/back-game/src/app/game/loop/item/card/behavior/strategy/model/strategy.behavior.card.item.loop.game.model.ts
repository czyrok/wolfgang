import { ContextParamBehaviorCardItemLoopGameModel } from '../../param/context/model/context.param.behavior.card.item.loop.game.model'

import { StrategyBehaviorCardPItemLoopGameInterface } from '../interface/strategy.behavior.card.item.loop.game.interface'

import { TimerModeBehaviorCardItemLoopGameEnum } from '../../timer-mode/enum/timer-mode.behavior.card.item.loop.game.enum'

import { CallbackContextParamItemLoopGameType } from '../../../../param/context/callback/type/callback.context.param.item.loop.game.type'
import { ResultSetItemLoopGameType } from '../../../../set/result/type/result.set.item.loop.game.type'

export abstract class StrategyBehaviorCardPItemLoopGameModel implements StrategyBehaviorCardPItemLoopGameInterface {
    public abstract validCondition(context: ContextParamBehaviorCardItemLoopGameModel): boolean
    public abstract doAtBeginning(context: ContextParamBehaviorCardItemLoopGameModel): void
    public abstract doAtEnd(context: ContextParamBehaviorCardItemLoopGameModel): void

    execute(context: ContextParamBehaviorCardItemLoopGameModel): void {
        if (!this.validCondition(context)) return

        switch (context.timerMode) {
            case TimerModeBehaviorCardItemLoopGameEnum.BEFORE:
                setTimeout(() => {
                    this.doAtBeginning(this.buildContext(context, (result1: ResultSetItemLoopGameType) => {
                        this.buildContext(context, (result2: ResultSetItemLoopGameType) => {
                            context.next(result2)
                        }, result1)
                    }))
                }, context.timer)

                break
            case TimerModeBehaviorCardItemLoopGameEnum.BETWEEN:
                this.doAtBeginning(this.buildContext(context, (result1: ResultSetItemLoopGameType) => {
                    setTimeout(() => {
                        this.buildContext(context, (result2: ResultSetItemLoopGameType) => {
                            context.next(result2)
                        }, result1)
                    }, context.timer)
                }))

                break
        }
    }

    buildContext(
        parentContext: ContextParamBehaviorCardItemLoopGameModel,
        callback: CallbackContextParamItemLoopGameType,
        result?: ResultSetItemLoopGameType
    ): ContextParamBehaviorCardItemLoopGameModel {
        return new ContextParamBehaviorCardItemLoopGameModel(
            parentContext.next,
            callback,
            parentContext.timer,
            parentContext.timerMode,
            parentContext.players,
            parentContext,
            result
        )
    }
}