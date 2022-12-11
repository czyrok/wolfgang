import { PlayerGameModel } from '../../../../../../../player/model/player.game.model'
import { ContextParamItemLoopGameModel } from '../../../../../param/context/model/context.param.item.loop.game.model'

import { TimerModeBehaviorCardItemLoopGameEnum } from '../../../timer-mode/enum/timer-mode.behavior.card.item.loop.game.enum'

import { ResultSetItemLoopGameType } from '../../../../../set/result/type/result.set.item.loop.game.type'

export class ContextParamBehaviorCardItemLoopGameModel extends ContextParamItemLoopGameModel {
    public constructor(
        private _timer: number,
        private _timerMode: TimerModeBehaviorCardItemLoopGameEnum,
        private _players: Array<PlayerGameModel>,
        parentContext?: ContextParamItemLoopGameModel | ContextParamBehaviorCardItemLoopGameModel,
        result?: ResultSetItemLoopGameType
    ) {
        super(parentContext, result)
    }

    public get timer(): number {
        return this._timer
    }

    public get timerMode(): TimerModeBehaviorCardItemLoopGameEnum {
        return this._timerMode
    }

    public get players(): Array<PlayerGameModel> {
        return this._players
    }
}