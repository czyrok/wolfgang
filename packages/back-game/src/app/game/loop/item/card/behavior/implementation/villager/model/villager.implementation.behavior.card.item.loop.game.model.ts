import { PlayerGameModel } from 'common'

import { FactoryCardPlayerGameUtil } from '../../../../../../../player/card/factory/util/factory.card.player.game.util'

import { BehaviorCardItemLoopGameModel } from '../../../model/behavior.card.item.loop.game.model'
import { ContextParamItemLoopGameModel } from '../../../../../param/context/model/context.param.item.loop.game.model'
import { HandlerVotePlayerGameModel } from '../../../../../../../player/vote/handler/model/handler.vote.player.game.model'
import { VillagerImplementationStrategyCampPlayerGameModel } from '../../../../../../../player/camp/strategy/implementation/villager/model/villager.implementation.strategy.camp.player.game.model'
import { ResultSetItemLoopGameModel } from '../../../../../set/result/model/result.set.item.loop.game.model'

import { TypeCardPlayerGameEnum } from '../../../../../../../player/card/type/enum/type.card.player.game.enum'
import { TypeProcessBehaviorCardItemLoopGameEnum } from '../../../process/type/enum/type.process.behavior.card.item.loop.game.enum'
import { TypeChatGameEnum } from '../../../../../../../chat/type/enum/type.chat.game.enum'

export class VillagerImplementationBehaviorCardItemLoop extends BehaviorCardItemLoopGameModel {
    public constructor() {
        super(
            '#adef',
            2,
            90,
            [
                FactoryCardPlayerGameUtil.get(TypeCardPlayerGameEnum.GREY_WEREWOLF),
                FactoryCardPlayerGameUtil.get(TypeCardPlayerGameEnum.VILLAGER)
            ],
            TypeChatGameEnum.ALIVE,
            new VillagerImplementationStrategyCampPlayerGameModel
        )
    }

    public validCondition(context: ContextParamItemLoopGameModel): boolean {
        if (this.getPlayer().length > 0) {
            return true
        } else {
            return false
        }
    }

    public doAtBeginning(context: ContextParamItemLoopGameModel): void {
        // #achan afficher un message
        context.next()
    }

    public doAtEnd(context: ContextParamItemLoopGameModel): void {
        // #achan afficher un message
        let handler: HandlerVotePlayerGameModel = HandlerVotePlayerGameModel.instance,
            player: PlayerGameModel | null = handler.mostVotedOfPlayersGroup(this.getPlayer())

        if (player !== null) {
            let result: ResultSetItemLoopGameModel = new ResultSetItemLoopGameModel
            result[TypeProcessBehaviorCardItemLoopGameEnum.KILL] = [player]

            context.next(result)
        } else {
            context.next()
        }
    }
}