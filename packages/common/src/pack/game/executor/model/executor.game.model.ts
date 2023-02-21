import { Exclude } from 'class-transformer'

import { CountCardRulesGameError } from '../../rules/card/error/count.card.rules.game.error'

import { LogUtil } from '../../../log/util/log.util'

import { RoomChatGameHelper } from '../../chat/room/helper/room.chat.game.helper'

import { GameModel } from '../../model/game.model'
import { ContextGameModel } from '../../context/model/context.game.model'
import { IteratorLoopGameModel } from '../../loop/iterator/model/iterator.loop.game.model'
import { RandomDistributionGameModel } from '../../distribution/random/model/random.distribution.game.model'

import { TypeLogEnum } from '../../../log/type/enum/type.log.enum'
import { TypeItemLoopGameEnum } from '../../loop/item/type/enum/type.item.loop.game.enum'
import { ProcessContextGameEnum } from '../../context/process/enum/process.context.game.enum'

import { ResultSetGameType } from '../../set/result/type/result.set.game.type'

@Exclude()
export class ExecutorGameModel {
    public async prelaunch(game: GameModel): Promise<void> {
        let dist: RandomDistributionGameModel = new RandomDistributionGameModel

        dist.processing(game.state.rules.choosingcardList, game.state.players).catch((error: CountCardRulesGameError) => {
            LogUtil.logger(TypeLogEnum.GAME).fatal(error.message)

            throw error
        })

        for (const player of game.state.players) {
            RoomChatGameHelper.setRoom(player)
        }

        const loopIte: IteratorLoopGameModel = new IteratorLoopGameModel

        for (const item of loopIte) await item.createChat(game.gameId)

        LogUtil.logger(TypeLogEnum.GAME).trace('Prelaunch game made')
    }

    public start(game: GameModel): void {
        setTimeout(() => {
            game.state.isStarted = true
            game.state.endTurnDate = new Date(Date.now() + 14e3)
            game.state.notifyUpdate()

            for (const player of game.state.players) {
                player.notifyUpdate()
            }

            game.chatManager.sendEventMessage('La partie va commencer !', 'stopwatch')
        }, 1e3)

        setTimeout(async () => {
            LogUtil.logger(TypeLogEnum.GAME).trace('Game started')

            await this.turn(game, new IteratorLoopGameModel)
        }, 15e3)
    }

    private async turn(game: GameModel, ite: IteratorLoopGameModel, previousResult?: ResultSetGameType): Promise<void> {
        LogUtil.logger(TypeLogEnum.GAME).info(`${ite.current.config.type} turn started`)

        game.namespace?.emit('resetVote')
        game.voteStorage.reset()

        LogUtil.logger(TypeLogEnum.GAME).trace(`All votes are reset`)

        game.state.endTurnDate = new Date(Date.now() + ite.current.getTimerBehavior() * 1000)
        game.state.currentBehaviorType.splice(0, game.state.currentBehaviorType.length)

        game.state.isNight = ite.current.config.atNight

        for (const behavior of ite.current.getBehavior()) {
            game.state.currentBehaviorType.push(behavior.config.type)
        }

        const context: ContextGameModel = ContextGameModel.buildContext(undefined, previousResult)
        
        context[ProcessContextGameEnum.VOTE_STORAGE] = game.voteStorage
        context[ProcessContextGameEnum.CHAT_MANAGER] = game.chatManager
        
        const currentType: TypeItemLoopGameEnum = ite.current.config.type

        context.res.subscribeOne((result: ResultSetGameType) => {
            setTimeout(async () => {
                LogUtil.logger(TypeLogEnum.GAME).info(`${currentType} turn ending`)

                await this.turn(game, ite, result)
            }, 500)
        })

        if (await ite.current.entryPoint(context)) {
            game.state.notifyUpdate()
        }

        ite.next()
    }
}