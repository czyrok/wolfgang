import { NextContextParamItemLoopGameHelper } from '../next/helper/next.context.param.item.loop.game.helper'

import { MapParamModel } from '../../../../../../param/map/model/map.param.model'
import { ResultSetItemLoopGameModel } from '../../../set/result/model/result.set.item.loop.game.model'

import { NextContextParamItemLoopGameType } from '../next/type/next.context.param.item.loop.game.type'
import { CallbackContextParamItemLoopGameType } from '../callback/type/callback.context.param.item.loop.game.type'
import { ResultSetItemLoopGameType } from '../../../set/result/type/result.set.item.loop.game.type'

export class ContextParamItemLoopGameModel extends MapParamModel {
    private _next: NextContextParamItemLoopGameType

    public constructor(
        parentNext: NextContextParamItemLoopGameType,
        callback: CallbackContextParamItemLoopGameType,
        parentContext?: ContextParamItemLoopGameModel,
        private _result?: ResultSetItemLoopGameType
    ) {
        super()

        NextContextParamItemLoopGameHelper.setNext(this, callback)

        if (parentContext !== undefined) this.setHeritage(parentContext)
    }

    public set next(value: (result: ResultSetItemLoopGameType) => void) {
        this._next = value
    }

    public get next(): (result: ResultSetItemLoopGameType) => void {
        return this._next
    }

    public set result(value: ResultSetItemLoopGameType) {
        this._result = value
    }

    public get result(): ResultSetItemLoopGameType {
        return this._result
    }
}