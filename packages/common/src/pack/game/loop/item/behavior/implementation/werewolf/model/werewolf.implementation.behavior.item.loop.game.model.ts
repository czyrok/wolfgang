import { InitFactoryRegistering } from '../../../../../../factory/decorator/factory.game.decorator'

import { GameModel } from '../../../../../../model/game.model'
import { ContextGameModel } from '../../../../../../context/model/context.game.model'
import { PlayerGameModel } from '../../../../../../player/model/player.game.model'
import { BehaviorItemLoopGameModel } from '../../../model/behavior.item.loop.game.model'
import { ResultSetGameModel } from '../../../../../../set/result/model/result.set.model'
import { HandlerVotePlayerGameModel } from '../../../../../../player/vote/handler/model/handler.vote.player.game.model'
import { VillainImplementationStrategyCampPlayerGameModel } from '../../../../../../player/camp/strategy/implementation/villain/model/villain.implementation.strategy.camp.player.game.model'

import { TypeChatGameEnum } from '../../../../../../chat/type/enum/type.chat.game.enum'
import { TypeCardGameEnum } from '../../../../../../card/type/enum/type.card.game.enum'
import { TypeProcessBehaviorItemLoopGameEnum } from '../../../process/type/enum/type.process.behavior.item.loop.game.enum'
import { TypeBehaviorItemLoopGameEnum } from '../../../type/enum/type.behavior.item.loop.game.enum'
import { TypeModeChatGameEnum } from '../../../../../../chat/mode/type/enum/type.mode.chat.game.enum'

@InitFactoryRegistering()
export class WerewolfImplementationBehaviorItemLoopGameModel extends BehaviorItemLoopGameModel {
    public constructor() {
        super({
            type: TypeBehaviorItemLoopGameEnum.WEREWOLF,
            timer: 10,
            cardTypeList: [
                TypeCardGameEnum.GREY_WEREWOLF
            ],
            chat: TypeChatGameEnum.WEREWOLF,
            chatMode: TypeModeChatGameEnum.NIGHT,
            campHierarchy: 1,
            campStrategy: new VillainImplementationStrategyCampPlayerGameModel
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
        const game: GameModel = GameModel.instance

        game.sendEventMessage('C\'est au tour des loups garous de désigner quelqu\'un !', 'cat-face')

        context.next()
    }

    public doAtEnd(context: ContextGameModel): void {
        // #achan
        const handler: HandlerVotePlayerGameModel = HandlerVotePlayerGameModel.instance,
            player: PlayerGameModel | null = handler.mostVotedOfPlayersGroup(this.getPlayer())

        if (player !== null) {
            const result: ResultSetGameModel = new ResultSetGameModel
            
            result[TypeProcessBehaviorItemLoopGameEnum.KILL] = [player]

            context.next(result)
        } else {
            context.next()
        }
    }
}