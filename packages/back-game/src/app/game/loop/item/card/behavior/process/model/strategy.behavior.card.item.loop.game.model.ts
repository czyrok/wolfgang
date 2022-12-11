import { ContextParamBehaviorCardItemLoopGameModel } from '../../param/context/model/context.param.behavior.card.item.loop.game.model'

import { ProcessBehaviorCardPItemLoopGameInterface } from '../interface/process.behavior.card.item.loop.game.interface'

import { ResultSetItemLoopGameType } from '../../../../set/result/type/result.set.item.loop.game.type'

export abstract class ProcessBehaviorCardPItemLoopGameModel implements ProcessBehaviorCardPItemLoopGameInterface<ContextParamBehaviorCardItemLoopGameModel> {
    abstract execute(context: ContextParamBehaviorCardItemLoopGameModel): ResultSetItemLoopGameType

    buildContext(
        parentContext: ContextParamBehaviorCardItemLoopGameModel,
        preivousResult?: ResultSetItemLoopGameType
    ): ContextParamBehaviorCardItemLoopGameModel {
        return new ContextParamBehaviorCardItemLoopGameModel(
            parentContext.timer,
            parentContext.timerMode,
            parentContext.players,
            parentContext,
            preivousResult
        )
    }
}