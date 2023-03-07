import { InitFactoryRegistering } from '../../../../../../factory/decorator/factory.game.decorator'

import { PlayerGameModel } from '../../../../../../player/model/player.game.model'
import { BehaviorItemLoopGameModel } from '../../../model/behavior.item.loop.game.model'
import { ContextGameModel } from '../../../../../../context/model/context.game.model'
import { VillagerImplementationStrategyCampPlayerGameModel } from '../../../../../../player/camp/strategy/implementation/villager/model/villager.implementation.strategy.camp.player.game.model'
import { ResultSetGameModel } from '../../../../../../set/result/model/result.set.model'
import { StorageVotePlayerGameModel } from '../../../../../../player/vote/storage/model/storage.vote.player.game.model'
import { ManagerChatGameModel } from '../../../../../../chat/manager/model/manager.chat.game.model'

import { TypeChatGameEnum } from '../../../../../../chat/type/enum/type.chat.game.enum'
import { TypeCardGameEnum } from '../../../../../../card/type/enum/type.card.game.enum'
import { TypeProcessBehaviorItemLoopGameEnum } from '../../../process/type/enum/type.process.behavior.item.loop.game.enum'
import { TypeBehaviorItemLoopGameEnum } from '../../../type/enum/type.behavior.item.loop.game.enum'
import { TypeModeChatGameEnum } from '../../../../../../chat/mode/type/enum/type.mode.chat.game.enum'
import { ProcessContextGameEnum } from '../../../../../../context/process/enum/process.context.game.enum'

@InitFactoryRegistering()
export class VillagerImplementationBehaviorItemLoopGameModel extends BehaviorItemLoopGameModel {
    public constructor() {
        super({
            type: TypeBehaviorItemLoopGameEnum.VILLAGER,
            timer: 20,
            cardTypeList: [
                TypeCardGameEnum.GREY_WEREWOLF,
                TypeCardGameEnum.VILLAGER
            ],
            hierarchy: 2,
            chat: TypeChatGameEnum.ALIVE,
            chatMode: TypeModeChatGameEnum.DAY,
            campStrategy: new VillagerImplementationStrategyCampPlayerGameModel
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

        await chatManager.sendEventMessage('C\'est au tour des villageois de désigner quelqu\'un !', 'sun-alt')

        context.next()
    }

    public async doAtEnd(context: ContextGameModel): Promise<void> {
        const voteStorage: StorageVotePlayerGameModel | undefined = context[ProcessContextGameEnum.VOTE_STORAGE]

        // #achan faire l'erreur
        if (!voteStorage) throw new Error

        const player: PlayerGameModel | null = voteStorage.mostVotedOfPlayersGroup(this.getPlayer())

        const result: ResultSetGameModel = new ResultSetGameModel

        if (player) {
            result[TypeProcessBehaviorItemLoopGameEnum.KILL] = [player]

            context.next(result)
        } else {
            result[TypeProcessBehaviorItemLoopGameEnum.KILL] = []

            context.next(result)
        }
    }
}