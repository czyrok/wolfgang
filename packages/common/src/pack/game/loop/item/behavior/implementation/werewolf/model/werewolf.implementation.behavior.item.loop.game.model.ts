import { InitFactoryRegistering } from '../../../../../../factory/decorator/factory.game.decorator'

import { ContextGameModel } from '../../../../../../context/model/context.game.model'
import { PlayerGameModel } from '../../../../../../player/model/player.game.model'
import { BehaviorItemLoopGameModel } from '../../../model/behavior.item.loop.game.model'
import { ResultSetGameModel } from '../../../../../../set/result/model/result.set.model'
import { StorageVotePlayerGameModel } from '../../../../../../player/vote/storage/model/storage.vote.player.game.model'
import { VillainImplementationStrategyCampPlayerGameModel } from '../../../../../../player/camp/strategy/implementation/villain/model/villain.implementation.strategy.camp.player.game.model'
import { ManagerChatGameModel } from '../../../../../../chat/manager/model/manager.chat.game.model'

import { TypeChatGameEnum } from '../../../../../../chat/type/enum/type.chat.game.enum'
import { TypeCardGameEnum } from '../../../../../../card/type/enum/type.card.game.enum'
import { TypeProcessBehaviorItemLoopGameEnum } from '../../../process/type/enum/type.process.behavior.item.loop.game.enum'
import { TypeBehaviorItemLoopGameEnum } from '../../../type/enum/type.behavior.item.loop.game.enum'
import { TypeModeChatGameEnum } from '../../../../../../chat/mode/type/enum/type.mode.chat.game.enum'
import { ProcessContextGameEnum } from '../../../../../../context/process/enum/process.context.game.enum'

@InitFactoryRegistering()
export class WerewolfImplementationBehaviorItemLoopGameModel extends BehaviorItemLoopGameModel {
    public constructor() {
        super({
            type: TypeBehaviorItemLoopGameEnum.WEREWOLF,
            timer: 20,
            cardTypeList: [
                TypeCardGameEnum.GREY_WEREWOLF
            ],
            hierarchy: 1,
            chat: TypeChatGameEnum.WEREWOLF,
            chatMode: TypeModeChatGameEnum.NIGHT,
            campStrategy: new VillainImplementationStrategyCampPlayerGameModel
        })
    }

    public async validCondition(_context: ContextGameModel): Promise<boolean> {
        if (this.getAlivePlayer().length > 0) {
            return true
        } else {
            return false
        }
    }

    public async doAtBeginning(context: ContextGameModel): Promise<void> {
        const chatManager: ManagerChatGameModel | undefined = context[ProcessContextGameEnum.CHAT_MANAGER]

        // #achan faire l'erreur 
        if (!chatManager) throw new Error

        let message: string = ''

        for (let i = 0; i < this.players.length; i++) {
            message += this.players[i].user.username

            if (i < this.players.length - 2) message += ', '
            if (i === this.players.length - 2) message += ' et '
        }

        await chatManager.sendEventMessage(`C\'est au tour des loups garous de désigner quelqu\'un !`, 'cat-face')
        await chatManager.sendEventMessage(`C'est à votre tour ${message} !`, 'cat-face', TypeChatGameEnum.WEREWOLF)

        context.next()
    }

    public async doAtEnd(context: ContextGameModel): Promise<void> {
        const voteStorage: StorageVotePlayerGameModel | undefined = context[ProcessContextGameEnum.VOTE_STORAGE]

        // #achan faire l'erreur
        if (!voteStorage) throw new Error

        const player: PlayerGameModel | null = voteStorage.mostVotedOfPlayersGroup(this.getPlayer())

        if (player) {
            const result: ResultSetGameModel = new ResultSetGameModel

            result[TypeProcessBehaviorItemLoopGameEnum.KILL] = [player]

            context.next(result)
        } else {
            context.next()
        }
    }
}