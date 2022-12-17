import { ContextParamItemLoopGameModel } from '../../../model/context.param.item.loop.game.model'
import { ResContextParamItemLoopGameModel } from '../../model/res.context.param.item.loop.game.model'

import { ResultSetItemLoopGameType } from '../../../../../set/result/type/result.set.item.loop.game.type'

export class WaitingResContextParamItemLoopGameModel {
    private _res: ResContextParamItemLoopGameModel = new ResContextParamItemLoopGameModel
    private _waitCount: number = 0
    private _resultStorage: Array<ResultSetItemLoopGameType> = new Array

    public get res(): ResContextParamItemLoopGameModel {
        return this._res
    }

    private set waitCount(value: number) {
        this._waitCount = value
    }

    private get waitCount(): number {
        return this._waitCount
    }

    private get resultStorage(): Array<ResultSetItemLoopGameType> {
        return this._resultStorage
    }

    private end(): void {
        if (this.waitCount === 0) {
            let returnedResult: ResultSetItemLoopGameType = undefined

            while (returnedResult === undefined && this.resultStorage.length > 0) {
                returnedResult = this.resultStorage.pop()
            }

            if (returnedResult !== undefined && this.resultStorage.length > 0) {
                for (let result of this.resultStorage) {
                    if (result !== undefined) returnedResult.setHeritage(result)
                }
            }

            this.res.next(returnedResult)
        }
    }

    public wait(contexts: Array<ContextParamItemLoopGameModel>): void {
        this.waitCount += contexts.length

        for (const context of contexts) {
            context.res.subscribeOne((result: ResultSetItemLoopGameType) => {
                this.resultStorage.push(result)

                this.waitCount -= 1

                this.end()
            })
        }
    }
}