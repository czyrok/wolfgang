import { PlayerGameModel } from "../../model/player.game.model"

export interface HandlerPlayerGameInterface{
    addPlayer(player: PlayerGameModel): void
    hasPlayer(player: PlayerGameModel): boolean
}