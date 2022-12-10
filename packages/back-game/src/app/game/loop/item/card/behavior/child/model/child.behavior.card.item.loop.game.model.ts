import { BehaviorCardItemLoopGameModel } from '../../model/behavior.card.item.loop.game.model'
import { CardPlayerGameModel } from '../../../../../../player/card/model/card.player.game.model'

import { StrategyCampPlayerGameInteface } from '../../../../../../player/camp/strategy/interface/strategy.camp.player.game.interface'
import { StrategyBehaviorCardPItemLoopGameInterface } from '../../strategy/interface/strategy.behavior.card.item.loop.game.interface'

import { TimerPlayerEnum } from '../../../../../../timer/enum/timer.player.enum'

export class ChildBehaviorCardItemLoopGameModel extends BehaviorCardItemLoopGameModel {
    public constructor(
        key: string,
        campHierarchy: number,
        timer: number,
        cardList: Array<CardPlayerGameModel>,
        behaviorStrategy: StrategyBehaviorCardPItemLoopGameInterface,
        campStrategy: StrategyCampPlayerGameInteface,
        private _timerMode: TimerPlayerEnum
    ) {
        super(key, campHierarchy, timer, cardList, behaviorStrategy, campStrategy)
    }

    public set timerMode(value: TimerPlayerEnum) {
        this._timerMode = value
    }

    public get timerMode(): TimerPlayerEnum {
        return this._timerMode
    }
}