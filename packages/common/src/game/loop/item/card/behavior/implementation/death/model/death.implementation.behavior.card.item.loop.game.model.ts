import { InitFactoryRegistering } from '../../../../../../../factory/decorator/factory.game.decorator'

import { PlayerGameModel } from '../../../../../../../player/model/player.game.model'
import { BehaviorCardItemLoopGameModel } from '../../../model/behavior.card.item.loop.game.model'
import { ContextGameModel } from '../../../../../../../context/model/context.game.model'

import { TypeChatGameEnum } from '../../../../../../../chat/type/enum/type.chat.game.enum'
import { TypeProcessBehaviorCardItemLoopGameEnum } from '../../../process/type/enum/type.process.behavior.card.item.loop.game.enum'
import { TypeBehaviorCardItemLoopGameEnum } from '../../../type/enum/type.behavior.card.item.loop.game.enum'

@InitFactoryRegistering()
export class DeathImplementationBehaviorCardItemLoopGameModel extends BehaviorCardItemLoopGameModel {
    public constructor() {
        super({
            type: TypeBehaviorCardItemLoopGameEnum.DEATH,
            // #achan
            timer: 0,
            cardTypeList: [],
            chat: TypeChatGameEnum.DEATH
        })
    }

    public validCondition(context: ContextGameModel): boolean {
        if (context[TypeProcessBehaviorCardItemLoopGameEnum.KILL] !== undefined) {
            return true
        } else {
            return false
        }
    }

    public doAtBeginning(context: ContextGameModel): void {
        // #achan afficher un message
        let players: Array<PlayerGameModel> = context[TypeProcessBehaviorCardItemLoopGameEnum.KILL]

        for (let player of players) {
            player.isDead = true

            this.players.push(player)
        }

        context.next()
    }

    public doAtEnd(context: ContextGameModel): void {
        context.next()
    }
}