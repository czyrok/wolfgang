import { PlayerGameModel } from '../../../../../../../player/model/player.game.model'
import { BehaviorCardItemLoopGameModel } from '../../../model/behavior.card.item.loop.game.model'
import { ContextGameModel } from '../../../../../../../context/model/context.game.model'

import { TypeChatGameEnum } from '../../../../../../../chat/type/enum/type.chat.game.enum'
import { TypeProcessBehaviorCardItemLoopGameEnum } from '../../../process/type/enum/type.process.behavior.card.item.loop.game.enum'

export class DeathImplementationBehaviorCardItemLoopGameModel extends BehaviorCardItemLoopGameModel {
    public constructor() {
        super(
            '#adef',
            // #achan
            -1,
            0,
            [],
            TypeChatGameEnum.DEATH
        )
    }

    public validCondition(context: ContextGameModel): boolean {
        if (context[TypeProcessBehaviorCardItemLoopGameEnum.KILL] !== undefined) {
            console.log('DEATH22')
            return true
        } else {
            console.log('DEATH25')
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