import { StrategyCampPlayerGameInteface } from '../../../../../../player/camp/strategy/interface/strategy.camp.player.game.interface'
import { TimerPlayerEnum } from '../../../../../../timer/enum/timer.player.enum'
import { BehaviorCardItemLoopGameModel } from '../../model/behavior.card.item.loop.game.model'
import { StrategyBehaviorCardPItemLoopGamesIntefrace } from '../../strategy/interface/strategy.behavior.card.item.loop.game.interface'

export class ChildBehaviorCardItemLoopGameModel extends BehaviorCardItemLoopGameModel {
    private _timerMode: TimerPlayerEnum

    public constructor(
        key: string,
        campHierarchy: number,
        timer: number,
        behaviorStrategy: StrategyBehaviorCardPItemLoopGamesIntefrace,
        campStrategy: StrategyCampPlayerGameInteface,
        timerMode: TimerPlayerEnum
    ) {
        super(key, campHierarchy, timer, behaviorStrategy, campStrategy)

        this._timerMode = timerMode
    }

    public set timerMode(value: TimerPlayerEnum) {
        this._timerMode = value
    }

    public get timerMode(): TimerPlayerEnum {
        return this._timerMode
    }
}