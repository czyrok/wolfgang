import { PlayerGameModel } from '../../../model/player.game.model'

export interface StrategyCampPlayerGameInterface {
    setCampToPlayer(list: Array<PlayerGameModel>): void
}