import { BehaviorCardItemLoopGameModel } from '../../../model/behavior.card.item.loop.game.model'
import { ContextParamItemLoopGameModel } from '../../../../../param/context/model/context.param.item.loop.game.model'
import { PlayerGameModel } from '../../../../../../../player/model/player.game.model'

import { TypeProcessBehaviorCardPItemLoopGameEnum } from '../../../process/type/enum/type.process.behavior.card.item.loop.game.enum'
import { TypeChatGameEnum } from '../../../../../../../chat/type/enum/type.chat.game.enum'

export class DeathImplementationBehaviorCardItemLoop extends BehaviorCardItemLoopGameModel {
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

    public validCondition(context: ContextParamItemLoopGameModel): boolean {
        if (context[TypeProcessBehaviorCardPItemLoopGameEnum.KILL] !== undefined) {
            return true
        } else {
            return false
        }
    }

    public doAtBeginning(context: ContextParamItemLoopGameModel): void {
        // #achan afficher un message
        let players: Array<PlayerGameModel> = context[TypeProcessBehaviorCardPItemLoopGameEnum.KILL]

        for (let player of players) {
            player.isDead = true

            this.players.push(player)
        }

        context.next()
    }

    public doAtEnd(context: ContextParamItemLoopGameModel): void { }
}