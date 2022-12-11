import { BehaviorCardItemLoopGameModel } from '../../model/behavior.card.item.loop.game.model'
import { CardPlayerGameModel } from '../../../../../../player/card/model/card.player.game.model'
import { ContextParamItemLoopGameModel } from '../../../../param/context/model/context.param.item.loop.game.model'
import { ContextParamBehaviorCardItemLoopGameModel } from '../../param/context/model/context.param.behavior.card.item.loop.game.model'

import { StrategyCampPlayerGameInteface } from '../../../../../../player/camp/strategy/interface/strategy.camp.player.game.interface'

import { TimerModeBehaviorCardItemLoopGameEnum } from '../../timer-mode/enum/timer-mode.behavior.card.item.loop.game.enum'

import { ResultSetItemLoopGameType } from '../../../../set/result/type/result.set.item.loop.game.type'

export abstract class ChildBehaviorCardItemLoopGameModel extends BehaviorCardItemLoopGameModel {
    public constructor(
        key: string,
        campHierarchy: number,
        timer: number,
        cardList: Array<CardPlayerGameModel>,
        campStrategy: StrategyCampPlayerGameInteface,
        private _timerMode: TimerModeBehaviorCardItemLoopGameEnum
    ) {
        super(key, campHierarchy, timer, cardList, campStrategy)
    }

    public get timerMode(): TimerModeBehaviorCardItemLoopGameEnum {
        return this._timerMode
    }

    override buildContext(
        parentContext: ContextParamItemLoopGameModel,
        preivousResult?: ResultSetItemLoopGameType
    ): ContextParamBehaviorCardItemLoopGameModel {
        return new ContextParamBehaviorCardItemLoopGameModel(
            this.timer,
            this.timerMode,
            this.getPlayer(),
            parentContext,
            preivousResult
        )
    }
}