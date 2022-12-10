import { ResultSetItemLoopGameModel } from '../../../../set/result/model/result.set.item.loop.game.model'
import { ContextParamItemLoopGameModel } from '../../model/context.param.item.loop.game.model'

import { NextContextParamItemLoopGameType } from '../type/next.context.param.item.loop.game.type'
import { CallbackContextParamItemLoopGameType } from '../../callback/type/callback.context.param.item.loop.game.type'

export class NextContextParamItemLoopGameHelper {
    public static setNext(
        context: ContextParamItemLoopGameModel,
        callback: CallbackContextParamItemLoopGameType
    ) {
        let currentNext: NextContextParamItemLoopGameType
            = (result?: ResultSetItemLoopGameModel) => {
                callback(result)
            }

        context.next = currentNext
    }
}