import { MapParamModel } from '../../../param/map/model/map.param.model'
import { ResContextGameModel } from '../res/model/res.context.game.model'

import { NextContextGameType } from '../next/type/next.context.game.type'
import { ResultSetGameType } from '../../set/result/type/result.set.game.type'

export class ContextGameModel extends MapParamModel<any> {
    private _next: NextContextGameType
    private _res: ResContextGameModel = new ResContextGameModel

    private constructor(
        parentContext?: ContextGameModel,
        private _previousResult?: ResultSetGameType
    ) {
        super()

        this._next = (result?: ResultSetGameType) => {
            this.res.next(result)
        }

        if (parentContext !== undefined) this.setHeritage(parentContext)
    }

    public get next(): (result?: ResultSetGameType) => void {
        return this._next
    }

    public get res(): ResContextGameModel {
        return this._res
    }

    public get previousResult(): ResultSetGameType {
        return this._previousResult
    }

    public static buildContext(
        parentContext?: ContextGameModel,
        preivousResult?: ResultSetGameType
    ): ContextGameModel {
        return new ContextGameModel(
            parentContext,
            preivousResult
        )
    }
}