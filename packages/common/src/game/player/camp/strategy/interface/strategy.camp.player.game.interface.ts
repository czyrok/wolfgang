import { PlayerGameModel } from '../../../model/player.game.model'

export interface StrategyCampPlayerGameInteface {
    setCampToPlayer(list: Array<PlayerGameModel>): void
}