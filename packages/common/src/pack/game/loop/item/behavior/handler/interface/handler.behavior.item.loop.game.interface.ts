import { PlayerGameModel } from '../../../../../player/model/player.game.model'
import { BehaviorItemLoopGameModel } from '../../model/behavior.item.loop.game.model'

export interface HandlerBehaviorItemLoopGameInterface {
    getBehavior(): Array<BehaviorItemLoopGameModel>
    getPlayerBehavior(player: PlayerGameModel): Array<BehaviorItemLoopGameModel>
    getTimerBehavior(): number
}