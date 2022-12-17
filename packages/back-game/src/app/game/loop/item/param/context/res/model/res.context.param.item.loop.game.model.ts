import { Subject, Subscription } from 'rxjs'

import { ResultSetItemLoopGameType } from '../../../../set/result/type/result.set.item.loop.game.type'
import { ResContextParamItemLoopGameType } from '../type/res.context.param.item.loop.game.type'

export class ResContextParamItemLoopGameModel {
    private _res: ResContextParamItemLoopGameType = new Subject<ResultSetItemLoopGameType>

    private get res(): ResContextParamItemLoopGameType {
        return this._res
    }

    public subscribeOne(callback: (result: ResultSetItemLoopGameType) => void): void {
        let sub: Subscription = this.res.subscribe((result: ResultSetItemLoopGameType) => {
            callback(result)

            sub.unsubscribe()
        })
    }

    public next(value?: ResultSetItemLoopGameType): void {
        this.res.next(value)
    }
}