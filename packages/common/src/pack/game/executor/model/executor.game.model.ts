import { kill, pid } from 'process'
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
import { CampPlayerGameHelper } from '../../player/camp/helper/camp.player.game.helper'
import { PlayerGameModel } from '../../player/model/player.game.model'
import { StageStateGameEnum } from '../../state/stage/enum/stage.state.game.enum'
import { TypeCardGameEnum } from '../../card/type/enum/type.card.game.enum'

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
            game.state.stage = StageStateGameEnum.STARTED
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

        CampPlayerGameHelper.resetPlayerCamp(game.state)
        CampPlayerGameHelper.setCampToPlayer()

        LogUtil.logger(TypeLogEnum.GAME).trace(`Camp defined`)

        if (CampPlayerGameHelper.getAlivePlayerCampCount(game.state) <= 1) return this.end(game)

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

    private async end(game: GameModel): Promise<void> {
        game.state.stage = StageStateGameEnum.FINISHED
        game.state.notifyUpdate()

        await game.chatManager.sendEventMessage('La partie est terminée !', 'ui-power')

        let winningPlayerMessage: string = ''

        const winningPlayers: Array<PlayerGameModel> = game.state.getAlivePlayer()

        for (let i = 0; i < winningPlayers.length; i++) {
            const player: PlayerGameModel = winningPlayers[i]

            player.gamePointAccumulated += 5

            player.emit<undefined>('winGamePoints', undefined)

            let cardName: string = ''

            switch (player.card.config.type) {
                case TypeCardGameEnum.GREY_WEREWOLF:
                    cardName = 'loug-garou'
                    break
                case TypeCardGameEnum.VILLAGER:
                    cardName = 'villageois'
                    break
            }

            winningPlayerMessage += `${player.user.username} (${cardName})`

            if (i < winningPlayers.length - 2) winningPlayerMessage += ', '
            if (i === winningPlayers.length - 2) winningPlayerMessage += ' et '
        }

        await game.chatManager.sendEventMessage(`Bravo à ${winningPlayerMessage} !`, 'crown-king')

        const allPlayers: Array<PlayerGameModel> = game.state.players

        for (const player of allPlayers) {
            await player.end()
        }

        LogUtil.logger(TypeLogEnum.GAME).trace(`Game ended`)

        setTimeout(() => {
            game.state.stage = StageStateGameEnum.KILLED
            game.state.notifyUpdate()

            kill(pid)
        }, 15e3)
    }
}