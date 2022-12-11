import { ContextParamItemLoopGameModel } from '../../../../../param/context/model/context.param.item.loop.game.model'

import { ResultSetItemLoopGameType } from '../../../../../set/result/type/result.set.item.loop.game.type'

export class ContextParamBehaviorCardItemLoopGameModel extends ContextParamItemLoopGameModel {
    public constructor(
        parentContext?: ContextParamItemLoopGameModel | ContextParamBehaviorCardItemLoopGameModel,
        result?: ResultSetItemLoopGameType
    ) {
        super(parentContext, result)
    }
}