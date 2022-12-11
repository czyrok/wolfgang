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

    override entryPoint(context: ContextParamItemLoopGameModel): void {
        switch (this.timerMode) {
            case TimerModeBehaviorCardItemLoopGameEnum.BEFORE:
                let childContext1: ContextParamBehaviorCardItemLoopGameModel = this.buildContext(context)

                childContext1.res.subscribeOne((result: ResultSetItemLoopGameType) => {
                    let childContext2: ContextParamBehaviorCardItemLoopGameModel = this.buildContext(context, result)

                    childContext2.res.subscribeOne((result: ResultSetItemLoopGameType) => {
                        context.next(result)
                    })

                    this.doAtEnd(childContext2)
                })

                setTimeout(() => {
                    this.doAtBeginning(childContext1)
                }, this.timer)

                break
            case TimerModeBehaviorCardItemLoopGameEnum.BETWEEN:
                let childContext11: ContextParamBehaviorCardItemLoopGameModel = this.buildContext(context)

                childContext11.res.subscribeOne((result: ResultSetItemLoopGameType) => {
                    let childContext22: ContextParamBehaviorCardItemLoopGameModel = this.buildContext(context, result)

                    childContext22.res.subscribeOne((result: ResultSetItemLoopGameType) => {
                        context.next(result)
                    })

                    setTimeout(() => {
                        this.doAtEnd(childContext22)
                    }, this.timer)
                })

                this.doAtBeginning(childContext11)

                break
        }
    }
}