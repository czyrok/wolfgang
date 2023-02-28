import { PlayerGameModel } from '../../model/player.game.model'

export interface HandlerPlayerGameInterface {
    hasPlayer(player: PlayerGameModel): boolean
    getPlayer(): Array<PlayerGameModel>
    getAlivePlayer(): Array<PlayerGameModel>
}