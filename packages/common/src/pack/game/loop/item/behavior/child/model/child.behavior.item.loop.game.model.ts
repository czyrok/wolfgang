import { TimerModeNotDefinedBehaviorItemLoopGameError } from '../../error/time-mode-not-defined.behavior.item.loop.game.error'

import { BehaviorItemLoopGameModel } from '../../model/behavior.item.loop.game.model'
import { ContextGameModel } from '../../../../../context/model/context.game.model'

import { TimerModeBehaviorItemLoopGameEnum } from '../../timer-mode/enum/timer-mode.behavior.item.loop.game.enum'

import { ResultSetGameType } from '../../../../../set/result/type/result.set.game.type'
import { ConfigBehaviorItemLoopGameInterface } from '../../config/interface/config.behavior.item.loop.game.interface'

export abstract class ChildBehaviorItemLoopGameModel extends BehaviorItemLoopGameModel {
    public constructor(config: ConfigBehaviorItemLoopGameInterface) {
        super(config)
    }

    override entryPoint(context: ContextGameModel): void {
        if (this.config.timerMode === undefined) throw new TimerModeNotDefinedBehaviorItemLoopGameError(this.config.type)

        switch (this.config.timerMode) {
            case TimerModeBehaviorItemLoopGameEnum.BEFORE:
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
            case TimerModeBehaviorItemLoopGameEnum.BETWEEN:
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