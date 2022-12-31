import { FactoryCardGameUtil } from '../../../../../../../card/factory/util/factory.card.game.util'

import { ContextGameModel } from '../../../../../../../context/model/context.game.model'
import { PlayerGameModel } from '../../../../../../../player/model/player.game.model'
import { BehaviorCardItemLoopGameModel } from '../../../model/behavior.card.item.loop.game.model'
import { ResultSetGameModel } from '../../../../../../../set/result/model/result.set.model'
import { HandlerVotePlayerGameModel } from '../../../../../../../player/vote/handler/model/handler.vote.player.game.model'
import { VillainImplementationStrategyCampPlayerGameModel } from '../../../../../../../player/camp/strategy/implementation/villain/model/villain.implementation.strategy.camp.player.game.model'

import { TypeChatGameEnum } from '../../../../../../../chat/type/enum/type.chat.game.enum'
import { TypeCardGameEnum } from '../../../../../../../card/type/enum/type.card.game.enum'
import { TypeProcessBehaviorCardItemLoopGameEnum } from '../../../process/type/enum/type.process.behavior.card.item.loop.game.enum'
import { TypeBehaviorCardItemLoopGameEnum } from '../../../type/enum/type.behavior.card.item.loop.game.enum'

export class WerewolfImplementationBehaviorCardItemLoopGameModel extends BehaviorCardItemLoopGameModel {
    public constructor() {
        super(
            TypeBehaviorCardItemLoopGameEnum.WEREWOLF,
            1,
            90,
            [
                FactoryCardGameUtil.get(TypeCardGameEnum.GREY_WEREWOLF)
            ],
            TypeChatGameEnum.WEREWOLF,
            new VillainImplementationStrategyCampPlayerGameModel
        )
    }

    public validCondition(context: ContextGameModel): boolean {
        if (this.getPlayer().length > 0) {
            return true
        } else {
            return false
        }
    }

    public doAtBeginning(context: ContextGameModel): void {
        // #achan
        context.next()
    }

    public doAtEnd(context: ContextGameModel): void {
        // #achan

        let handler: HandlerVotePlayerGameModel = HandlerVotePlayerGameModel.instance,
            player: PlayerGameModel | null = handler.mostVotedOfPlayersGroup(this.getPlayer())

        if (player !== null) {
            let result: ResultSetGameModel = new ResultSetGameModel
            result[TypeProcessBehaviorCardItemLoopGameEnum.KILL] = [player]

            context.next(result)
        } else {
            context.next()
        }
    }
}