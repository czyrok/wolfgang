import { ContextGameModel } from '../../../model/context.game.model'
import { ResContextGameModel } from '../../model/res.context.game.model'

import { ResultSetGameType } from '../../../../set/result/type/result.set.game.type'

export class WaitingResContextGameModel {
    private _res: ResContextGameModel = new ResContextGameModel
    private _waitCount: number = 0
    private _resultStorage: Array<ResultSetGameType> = new Array

    public get res(): ResContextGameModel {
        return this._res
    }

    private set waitCount(value: number) {
        this._waitCount = value
    }

    private get waitCount(): number {
        return this._waitCount
    }

    private get resultStorage(): Array<ResultSetGameType> {
        return this._resultStorage
    }

    private end(): void {
        if (this.waitCount === 0) {
            let returnedResult: ResultSetGameType = undefined

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

    public wait(contexts: Array<ContextGameModel>): void {
        this.waitCount += contexts.length

        for (const context of contexts) {
            context.res.subscribeOne((result: ResultSetGameType) => {
                this.resultStorage.push(result)

                this.waitCount -= 1

                this.end()
            })
        }
    }
}