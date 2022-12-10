import { PlayerGameModel } from '../../model/player.game.model'

export interface HandlerPlayerGameInterface {
    hasPlayer(player: PlayerGameModel): boolean
}