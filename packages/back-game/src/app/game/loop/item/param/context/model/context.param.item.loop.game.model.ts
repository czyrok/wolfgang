import { MapParamModel } from '../../../../../../param/map/model/map.param.model'

import { NextContextParamItemLoopGameType } from '../next/type/next.context.param.item.loop.game.type'
import { ResultSetItemLoopGameType } from '../../../set/result/type/result.set.item.loop.game.type'
import { ResContextParamItemLoopGameModel } from '../res/model/res.context.param.item.loop.game.model'

export class ContextParamItemLoopGameModel extends MapParamModel<any> {
    private _next: NextContextParamItemLoopGameType
    private _res: ResContextParamItemLoopGameModel = new ResContextParamItemLoopGameModel

    public constructor(
        parentContext?: ContextParamItemLoopGameModel,
        private _previousResult?: ResultSetItemLoopGameType
    ) {
        super()

        this._next = (result?: ResultSetItemLoopGameType) => {
            this.res.next(result)
        }

        if (parentContext !== undefined) this.setHeritage(parentContext)
    }

    public get next(): (result: ResultSetItemLoopGameType) => void {
        return this._next
    }

    public get res(): ResContextParamItemLoopGameModel {
        return this._res
    }

    public get previousResult(): ResultSetItemLoopGameType {
        return this._previousResult
    }
}