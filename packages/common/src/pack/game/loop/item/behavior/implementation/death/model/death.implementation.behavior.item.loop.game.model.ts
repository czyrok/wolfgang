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

import { TypeCardGameEnum } from '../../../../../../card/type/enum/type.card.game.enum'
import { TypeAlertEnum } from '../../../../../../../alert/type/enum/type.alert.enum'

import { ResultSetGameType } from '../../../../../../set/result/type/result.set.game.type'

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
        if (context.previousResult && context.previousResult[TypeProcessBehaviorItemLoopGameEnum.KILL]) {
            return true
        } else {
            const chatManager: ManagerChatGameModel | undefined = context[ProcessContextGameEnum.CHAT_MANAGER]

            // #achan faire l'erreur 
            if (!chatManager) throw new Error

            await chatManager.sendEventMessage(`Personne n'est mort`, 'skull-danger', TypeAlertEnum.WARNING)

            return false
        }
    }

    public async doAtBeginning(context: ContextGameModel): Promise<void> {
        const previousResult: ResultSetGameType = context.previousResult

        // #achan faire l'erreur de configuration
        if (!previousResult) throw new Error

        const chatManager: ManagerChatGameModel | undefined = context[ProcessContextGameEnum.CHAT_MANAGER]

        // #achan faire l'erreur 
        if (!chatManager) throw new Error

        const players: Array<PlayerGameModel> = previousResult[TypeProcessBehaviorItemLoopGameEnum.KILL]

        // #achan faire l'erreur 
        if (!players) throw new Error

        if (players.length > 1) {
            await chatManager.sendEventMessage(`Plusieurs personnes sont mortes`, 'skull-danger', TypeAlertEnum.WARNING)
        } else if (players.length > 0) {
            await chatManager.sendEventMessage(`Une personne est morte`, 'skull-danger', TypeAlertEnum.WARNING)
        } else {
            await chatManager.sendEventMessage(`Personne n'est mort`, 'skull-danger', TypeAlertEnum.WARNING)
        }

        for (const player of players) {
            player.isDead = true

            let cardName: string = ''

            switch (player.card.config.type) {
                case TypeCardGameEnum.GREY_WEREWOLF:
                    cardName = 'loup-garou'
                    break
                case TypeCardGameEnum.VILLAGER:
                    cardName = 'villageois'
                    break
            }

            await chatManager.sendEventMessage(`${player.user.username} est mort ! Son rôle était ${cardName}`, 'skull-danger', TypeAlertEnum.DANGER)

            this.players.push(player)
        }

        context.next()
    }

    public async doAtEnd(context: ContextGameModel): Promise<void> {
        context.next()
    }
}