import { InitFactoryRegistering } from '../../../../../../factory/decorator/factory.game.decorator'

import { PlayerGameModel } from '../../../../../../player/model/player.game.model'
import { BehaviorItemLoopGameModel } from '../../../model/behavior.item.loop.game.model'
import { ContextGameModel } from '../../../../../../context/model/context.game.model'
import { HandlerVotePlayerGameModel } from '../../../../../../player/vote/handler/model/handler.vote.player.game.model'
import { VillagerImplementationStrategyCampPlayerGameModel } from '../../../../../../player/camp/strategy/implementation/villager/model/villager.implementation.strategy.camp.player.game.model'
import { ResultSetGameModel } from '../../../../../../set/result/model/result.set.model'

import { TypeChatGameEnum } from '../../../../../../chat/type/enum/type.chat.game.enum'
import { TypeCardGameEnum } from '../../../../../../card/type/enum/type.card.game.enum'
import { TypeProcessBehaviorItemLoopGameEnum } from '../../../process/type/enum/type.process.behavior.item.loop.game.enum'
import { TypeBehaviorItemLoopGameEnum } from '../../../type/enum/type.behavior.item.loop.game.enum'

@InitFactoryRegistering()
export class VillagerImplementationBehaviorItemLoopGameModel extends BehaviorItemLoopGameModel {
    public constructor() {
        super({
            type: TypeBehaviorItemLoopGameEnum.VILLAGER,
            timer: 90,
            cardTypeList: [
                TypeCardGameEnum.GREY_WEREWOLF,
                TypeCardGameEnum.VILLAGER
            ],
            chat: TypeChatGameEnum.ALIVE,
            campHierarchy: 2,
            campStrategy: new VillagerImplementationStrategyCampPlayerGameModel
        })
    }

    public validCondition(context: ContextGameModel): boolean {
        if (this.getPlayer().length > 0) {
            return true
        } else {
            return false
        }
    }

    public doAtBeginning(context: ContextGameModel): void {
        // #achan afficher un message
        context.next()
    }

    public doAtEnd(context: ContextGameModel): void {
        // #achan afficher un message
        let handler: HandlerVotePlayerGameModel = HandlerVotePlayerGameModel.instance,
            player: PlayerGameModel | null = handler.mostVotedOfPlayersGroup(this.getPlayer())

        if (player !== null) {
            let result: ResultSetGameModel = new ResultSetGameModel
            result[TypeProcessBehaviorItemLoopGameEnum.KILL] = [player]

            context.next(result)
        } else {
            context.next()
        }
    }
}