import { PlayerGameModel } from '../../model/player.game.model'

/**
 * Interface qui gère les joueurs d'une partie
 */
export interface HandlerPlayerGameInterface {
    hasPlayer(player: PlayerGameModel): boolean
    getPlayer(): Array<PlayerGameModel>
    getAlivePlayer(): Array<PlayerGameModel>
}