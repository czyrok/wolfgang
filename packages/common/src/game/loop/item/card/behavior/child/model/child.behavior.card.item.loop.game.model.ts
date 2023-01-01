import { TimerModeNotDefinedBehaviorCardItemLoopGameError } from '../../error/time-mode-not-defined.behavior.card.item.loop.game.error'

import { BehaviorCardItemLoopGameModel } from '../../model/behavior.card.item.loop.game.model'
import { ContextGameModel } from '../../../../../../context/model/context.game.model'

import { TimerModeBehaviorCardItemLoopGameEnum } from '../../timer-mode/enum/timer-mode.behavior.card.item.loop.game.enum'

import { ResultSetGameType } from '../../../../../../set/result/type/result.set.game.type'
import { ConfigBehaviorCardItemLoopGameInterface } from '../../config/interface/config.behavior.card.item.loop.game.interface'

export abstract class ChildBehaviorCardItemLoopGameModel extends BehaviorCardItemLoopGameModel {
    public constructor(config: ConfigBehaviorCardItemLoopGameInterface) {
        super(config)
    }

    override entryPoint(context: ContextGameModel): void {
        if (this.config.timerMode === undefined) throw new TimerModeNotDefinedBehaviorCardItemLoopGameError(this.config.type)

        switch (this.config.timerMode) {
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
                }, this.config.timer * 1000)

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
                    }, this.config.timer * 1000)
                })

                this.doAtBeginning(childContext11)

                break
        }
    }
}