import { Exclude, Expose } from 'class-transformer'

import { CountCardRulesGameError } from '../../rules/card/error/count.card.rules.game.error'

import { LogUtil } from '../../../log/util/log.util'

import { RoomChatGameHelper } from '../../chat/room/helper/room.chat.game.helper'

import { ContextGameModel } from '../../context/model/context.game.model'
import { IteratorLoopGameModel } from '../../loop/iterator/model/iterator.loop.game.model'
import { RandomDistributionGameModel } from '../../distribution/random/model/random.distribution.game.model'
import { StateGameModel } from '../../state/model/state.game.model'

import { TypeLogEnum } from '../../../log/type/enum/type.log.enum'
import { TypeItemLoopGameEnum } from '../../loop/item/type/enum/type.item.loop.game.enum'

import { ResultSetGameType } from '../../set/result/type/result.set.game.type'
import { Namespace } from 'socket.io'
import { GameModel } from '../../model/game.model'

@Exclude()
export class ExecutorGameModel {
    public async prelaunch(namespace: Namespace, state: StateGameModel): Promise<void> {
        let dist: RandomDistributionGameModel = new RandomDistributionGameModel

        dist.processing(state.rules.choosingcardList, state.players).catch((error: CountCardRulesGameError) => {
            LogUtil.logger(TypeLogEnum.GAME).fatal(error.message)

            // #achan
            throw error
        })

        for (const player of state.players) {
            RoomChatGameHelper.setRoom(player)
        }

        const loopIte: IteratorLoopGameModel = new IteratorLoopGameModel

        for (const item of loopIte) await item.createChat()

        LogUtil.logger(TypeLogEnum.GAME).trace('Prelaunch game made')
    }

    public start(state: StateGameModel): void {
        const game: GameModel = GameModel.instance

        setTimeout(() => {
            state.isStarted = true
            state.endTurnDate = new Date(Date.now() + 14e3)
            state.notifyUpdate()

            for (const player of state.players) {
                player.notifyUpdate()
            }

            game.sendEventMessage('La partie va commencer !', 'stopwatch')
        }, 1e3)

        setTimeout(() => {
            LogUtil.logger(TypeLogEnum.GAME).trace('Game started')

            this.turn(state, new IteratorLoopGameModel)
        }, 15e3)
    }

    private turn(state: StateGameModel, ite: IteratorLoopGameModel, previousResult?: ResultSetGameType): void {
        LogUtil.logger(TypeLogEnum.GAME).info(`${ite.current.config.type} turn started`)

        state.endTurnDate = new Date(Date.now() + ite.current.getTimerBehavior() * 1000)
        state.currentBehaviorType.splice(0, state.currentBehaviorType.length)

        state.isNight = ite.current.config.atNight

        for (const behavior of ite.current.getBehavior()) {
            state.currentBehaviorType.push(behavior.config.type)
        }

        let context: ContextGameModel = ContextGameModel.buildContext(undefined, previousResult),
            currentType: TypeItemLoopGameEnum = ite.current.config.type

        context.res.subscribeOne((result: ResultSetGameType) => {
            setTimeout(() => {
                LogUtil.logger(TypeLogEnum.GAME).info(`${currentType} turn ending`)

                this.turn(state, ite, result)
            }, 500)
        })

        if (ite.current.entryPoint(context)) {
            state.notifyUpdate()
        }

        ite.next()
    }
}