import { BehaviorCardItemLoopGameModel } from '../../model/behavior.card.item.loop.game.model'
import { CardPlayerGameModel } from '../../../../../../player/card/model/card.player.game.model'
import { ContextParamItemLoopGameModel } from '../../../../param/context/model/context.param.item.loop.game.model'
import { ContextParamBehaviorCardItemLoopGameModel } from '../../param/context/model/context.param.behavior.card.item.loop.game.model'

import { StrategyCampPlayerGameInteface } from '../../../../../../player/camp/strategy/interface/strategy.camp.player.game.interface'
import { StrategyBehaviorCardPItemLoopGameInterface } from '../../strategy/interface/strategy.behavior.card.item.loop.game.interface'

import { TimerModeBehaviorCardItemLoopGameEnum } from '../../timer-mode/enum/timer-mode.behavior.card.item.loop.game.enum'

import { ResultSetItemLoopGameType } from '../../../../set/result/type/result.set.item.loop.game.type'
import { CallbackContextParamItemLoopGameType } from '../../../../param/context/callback/type/callback.context.param.item.loop.game.type'

export abstract class ChildBehaviorCardItemLoopGameModel extends BehaviorCardItemLoopGameModel {
    public constructor(
        key: string,
        campHierarchy: number,
        timer: number,
        cardList: Array<CardPlayerGameModel>,
        behaviorStrategy: StrategyBehaviorCardPItemLoopGameInterface,
        campStrategy: StrategyCampPlayerGameInteface,
        private _timerMode: TimerModeBehaviorCardItemLoopGameEnum
    ) {
        super(key, campHierarchy, timer, cardList, behaviorStrategy, campStrategy)
    }

    public set timerMode(value: TimerModeBehaviorCardItemLoopGameEnum) {
        this._timerMode = value
    }

    public get timerMode(): TimerModeBehaviorCardItemLoopGameEnum {
        return this._timerMode
    }

    override buildContext(
        parentContext: ContextParamItemLoopGameModel,
        callback: CallbackContextParamItemLoopGameType,
        result?: ResultSetItemLoopGameType
    ): ContextParamBehaviorCardItemLoopGameModel {
        return new ContextParamBehaviorCardItemLoopGameModel(
            parentContext.next,
            callback,
            this.timer,
            this.timerMode,
            // adef
            [],
            parentContext,
            result
        )
    }
}