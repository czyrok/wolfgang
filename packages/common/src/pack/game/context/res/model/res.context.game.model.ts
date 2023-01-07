import { Subject, Subscription } from 'rxjs'

import { ResultSetGameType } from '../../../set/result/type/result.set.game.type'
import { ResContextGameType } from '../type/res.context.game.type'

export class ResContextGameModel {
    private _res: ResContextGameType = new Subject<ResultSetGameType>

    private get res(): ResContextGameType {
        return this._res
    }

    public subscribeOne(callback: (result: ResultSetGameType) => void): void {
        let sub: Subscription = this.res.subscribe((result: ResultSetGameType) => {
            callback(result)

            sub.unsubscribe()
        })
    }

    public next(value?: ResultSetGameType): void {
        this.res.next(value)
    }
}