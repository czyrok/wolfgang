import { PlayerGameModel } from '../../../model/player.game.model'

/**
 * Interface qui définie le camp d'un joueur
 */
export interface StrategyCampPlayerGameInterface {
    setCampToPlayer(list: Array<PlayerGameModel>): void
}