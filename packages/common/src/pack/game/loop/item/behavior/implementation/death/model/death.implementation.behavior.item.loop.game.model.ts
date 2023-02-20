import { InitFactoryRegistering } from '../../../../../../factory/decorator/factory.game.decorator'

import { PlayerGameModel } from '../../../../../../player/model/player.game.model'
import { BehaviorItemLoopGameModel } from '../../../model/behavior.item.loop.game.model'
import { ContextGameModel } from '../../../../../../context/model/context.game.model'
import { ManagerChatGameModel } from '../../../../../../chat/manager/model/manager.chat.game.model'

import { TypeChatGameEnum } from '../../../../../../chat/type/enum/type.chat.game.enum'
import { TypeProcessBehaviorItemLoopGameEnum } from '../../../process/type/enum/type.process.behavior.item.loop.game.enum'
import { TypeBehaviorItemLoopGameEnum } from '../../../type/enum/type.behavior.item.loop.game.enum'
import { TypeModeChatGameEnum } from '../../../../../../chat/mode/type/enum/type.mode.chat.game.enum'
import { ProcessContextGameEnum } from '../../../../../../context/process/enum/process.context.game.enum'

import { ResultSetGameType } from '../../../../../../set/result/type/result.set.game.type'
import { LogUtil } from '../../../../../../../log/util/log.util'
import { TypeLogEnum } from '../../../../../../../log/type/enum/type.log.enum'

@InitFactoryRegistering()
export class DeathImplementationBehaviorItemLoopGameModel extends BehaviorItemLoopGameModel {
    public constructor() {
        super({
            type: TypeBehaviorItemLoopGameEnum.DEATH,
            // #achan
            timer: 0,
            cardTypeList: [],
            hierarchy: 0,
            chat: TypeChatGameEnum.DEATH,
            chatMode: TypeModeChatGameEnum.NIGHT
        })
    }

    public async validCondition(context: ContextGameModel): Promise<boolean> {
        LogUtil.logger(TypeLogEnum.APP).warn('iciwtf', context.previousResult == undefined)

        if (context.previousResult && context.previousResult[TypeProcessBehaviorItemLoopGameEnum.KILL]) {
            return true
        } else {
            return false
        }
    }

    public async doAtBeginning(context: ContextGameModel): Promise<void> {
        const previousResult: ResultSetGameType = context.previousResult

        LogUtil.logger(TypeLogEnum.APP).warn('ici1', context.previousResult === undefined)

        // #achan faire l'erreur de configuration
        if (!previousResult) throw new Error

        LogUtil.logger(TypeLogEnum.APP).warn('ici2')

        const chatManager: ManagerChatGameModel | undefined = context[ProcessContextGameEnum.CHAT_MANAGER]

        // #achan faire l'erreur 
        if (!chatManager) throw new Error

        LogUtil.logger(TypeLogEnum.APP).warn('ici3')

        const players: Array<PlayerGameModel> = previousResult[TypeProcessBehaviorItemLoopGameEnum.KILL]

        // #achan faire l'erreur 
        if (!players) throw new Error

        LogUtil.logger(TypeLogEnum.APP).warn('ici4')

        if (players.length > 1) {
            await chatManager.sendEventMessage(`Plusieurs personnes sont mortes`, 'skull-danger')
        } else if (players.length > 0) {
            await chatManager.sendEventMessage(`Une personne est morte`, 'skull-danger')
        } else {
            await chatManager.sendEventMessage(`Personne n'est mort`, 'skull-danger')
        }

        for (const player of players) {
            player.isDead = true

            await chatManager.sendEventMessage(`${player.user.username} est mort ! Son rôle était ${player.card.config.type}`, 'skull-danger')

            this.players.push(player)
        }

        context.next()
    }

    public async doAtEnd(context: ContextGameModel): Promise<void> {
        context.next()
    }
}