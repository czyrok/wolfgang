import { CardGameModel } from '../../../../../../card/model/card.game.model'
import { BehaviorCardItemLoopGameModel } from '../../model/behavior.card.item.loop.game.model'
import { ContextGameModel } from '../../../../../../context/model/context.game.model'

import { StrategyCampPlayerGameInterface } from '../../../../../../player/camp/strategy/interface/strategy.camp.player.game.interface'

import { TypeChatGameEnum } from '../../../../../../chat/type/enum/type.chat.game.enum'
import { TimerModeBehaviorCardItemLoopGameEnum } from '../../timer-mode/enum/timer-mode.behavior.card.item.loop.game.enum'

import { ResultSetGameType } from '../../../../../../set/result/type/result.set.game.type'
import { TypeBehaviorCardItemLoopGameEnum } from '../../type/enum/type.behavior.card.item.loop.game.enum'

export abstract class ChildBehaviorCardItemLoopGameModel extends BehaviorCardItemLoopGameModel {
    public constructor(
        type: TypeBehaviorCardItemLoopGameEnum,
        campHierarchy: number,
        timer: number,
        cardList: Array<CardGameModel>,
        private _timerMode: TimerModeBehaviorCardItemLoopGameEnum,
        chat?: TypeChatGameEnum,
        campStrategy?: StrategyCampPlayerGameInterface
    ) {
        super(type, campHierarchy, timer, cardList, chat, campStrategy)
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