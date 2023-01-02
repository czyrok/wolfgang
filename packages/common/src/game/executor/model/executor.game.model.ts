import { CountRandomDistributionGameError } from '../../distribution/random/error/count.random.distribution.game.error'

import { LogUtil } from '../../../log/util/log.util'

import { ContextGameModel } from '../../context/model/context.game.model'
import { IteratorLoopGameModel } from '../../loop/iterator/model/iterator.loop.game.model'
import { RandomDistributionGameModel } from '../../distribution/random/model/random.distribution.game.model'
import { StateGameModel } from '../../state/model/state.game.model'

import { TypeLogEnum } from '../../../log/type/enum/type.log.enum'
import { TypeItemLoopGameEnum } from '../../loop/item/type/enum/type.item.loop.game.enum'

import { ResultSetGameType } from '../../set/result/type/result.set.game.type'

export class ExecutorGameModel {
    private _isStarted: boolean = false

    private set isStarted(value: boolean) {
        this._isStarted = value
    }

    public get isStarted(): boolean {
        return this._isStarted
    }

    public prelaunch(state: StateGameModel): void {
        let dist: RandomDistributionGameModel = new RandomDistributionGameModel

        dist.processing(state.rules.choosingcardList, state.players).catch((error: CountRandomDistributionGameError) => {
            LogUtil.logger(TypeLogEnum.GAME).fatal(error.message)

            // #achan
            throw error
        })

        LogUtil.logger(TypeLogEnum.GAME).trace('Prelaunch game made')
    }

    public start(): void {
        this.isStarted = true

        LogUtil.logger(TypeLogEnum.GAME).trace('Game started')

        this.turn(new IteratorLoopGameModel)
    }

    private turn(ite: IteratorLoopGameModel, previousResult?: ResultSetGameType): void {
        LogUtil.logger(TypeLogEnum.GAME).info(`${ite.current.config.type} turn started`)

        let context: ContextGameModel = ContextGameModel.buildContext(undefined, previousResult),
            currentType: TypeItemLoopGameEnum = ite.current.config.type

        context.res.subscribeOne((result: ResultSetGameType) => {
            setTimeout(() => {
                LogUtil.logger(TypeLogEnum.GAME).info(`${currentType} turn ending`)

                this.turn(ite, result)
            }, 500)
        })

        ite.current.entryPoint(context)

        ite.next()
    }
}