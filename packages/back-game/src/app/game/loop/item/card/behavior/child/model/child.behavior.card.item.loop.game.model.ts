import { CardPlayerGameModel, TypeChatGameEnum } from 'common'

import { BehaviorCardItemLoopGameModel } from '../../model/behavior.card.item.loop.game.model'
import { ContextGameModel } from '../../../../../../context/model/context.game.model'

import { StrategyCampPlayerGameInteface } from '../../../../../../player/camp/strategy/interface/strategy.camp.player.game.interface'

import { TimerModeBehaviorCardItemLoopGameEnum } from '../../timer-mode/enum/timer-mode.behavior.card.item.loop.game.enum'

import { ResultSetGameType } from '../../../../../../set/result/type/result.set.game.type'

export abstract class ChildBehaviorCardItemLoopGameModel extends BehaviorCardItemLoopGameModel {
    public constructor(
        key: string,
        campHierarchy: number,
        timer: number,
        cardList: Array<CardPlayerGameModel>,
        private _timerMode: TimerModeBehaviorCardItemLoopGameEnum,
        chat?: TypeChatGameEnum,
        campStrategy?: StrategyCampPlayerGameInteface
    ) {
        super(key, campHierarchy, timer, cardList, chat, campStrategy)
    }

    public get timerMode(): TimerModeBehaviorCardItemLoopGameEnum {
        return this._timerMode
    }

    override entryPoint(context: ContextGameModel): void {
        switch (this.timerMode) {
            case TimerModeBehaviorCardItemLoopGameEnum.BEFORE:
                let childContext1: ContextGameModel = ContextGameModel.buildContext(context)

                childContext1.res.subscribeOne((result: ResultSetGameType) => {
                    let childContext2: ContextGameModel = ContextGameModel.buildContext(context, result)

                    childContext2.res.subscribeOne((result: ResultSetGameType) => {
                        context.next(result)
                    })

                    this.doAtEnd(childContext2)
                })

                setTimeout(() => {
                    this.doAtBeginning(childContext1)
                }, this.timer * 1000)

                break
            case TimerModeBehaviorCardItemLoopGameEnum.BETWEEN:
                let childContext11: ContextGameModel = ContextGameModel.buildContext(context)

                childContext11.res.subscribeOne((result: ResultSetGameType) => {
                    let childContext22: ContextGameModel = ContextGameModel.buildContext(context, result)

                    childContext22.res.subscribeOne((result: ResultSetGameType) => {
                        context.next(result)
                    })

                    setTimeout(() => {
                        this.doAtEnd(childContext22)
                    }, this.timer * 1000)
                })

                this.doAtBeginning(childContext11)

                break
        }
    }
}