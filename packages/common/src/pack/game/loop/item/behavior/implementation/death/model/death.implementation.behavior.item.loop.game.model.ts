import { InitFactoryRegistering } from '../../../../../../factory/decorator/factory.game.decorator'

import { PlayerGameModel } from '../../../../../../player/model/player.game.model'
import { BehaviorItemLoopGameModel } from '../../../model/behavior.item.loop.game.model'
import { ContextGameModel } from '../../../../../../context/model/context.game.model'

import { TypeChatGameEnum } from '../../../../../../chat/type/enum/type.chat.game.enum'
import { TypeProcessBehaviorItemLoopGameEnum } from '../../../process/type/enum/type.process.behavior.item.loop.game.enum'
import { TypeBehaviorItemLoopGameEnum } from '../../../type/enum/type.behavior.item.loop.game.enum'
import { GameModel } from '../../../../../../model/game.model'
import { TypeModeChatGameEnum } from '../../../../../../chat/mode/type/enum/type.mode.chat.game.enum'

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

    public validCondition(context: ContextGameModel): boolean {
        if (context[TypeProcessBehaviorItemLoopGameEnum.KILL] !== undefined) {
            return true
        } else {
            return false
        }
    }

    public doAtBeginning(context: ContextGameModel): void {
        const game: GameModel = GameModel.instance

        const players: Array<PlayerGameModel> = context[TypeProcessBehaviorItemLoopGameEnum.KILL]

        if (players.length > 1) {
            game.sendEventMessage(`Plusieurs personnes sont mortes`, 'skull-danger')
        } else if (players.length > 0) {
            game.sendEventMessage(`Une personne est morte`, 'skull-danger')
        } else {
            game.sendEventMessage(`Personne n'est mort`, 'skull-danger')
        }

        for (const player of players) {
            player.isDead = true

            game.sendEventMessage(`${player.user.username} est mort ! Son rôle était ${player.card.config.type}`, 'skull-danger')

            this.players.push(player)
        }

        context.next()
    }

    public doAtEnd(context: ContextGameModel): void {
        context.next()
    }
}