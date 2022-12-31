import { PlayerGameModel } from '../../model/player.game.model'

// #amet
export class HandlerPlayerGameModel {
    private static _instance: HandlerPlayerGameModel = new HandlerPlayerGameModel

    private _players: Array<PlayerGameModel> = new Array

    private constructor() { }

    public static get instance(): HandlerPlayerGameModel {
        return this._instance
    }

    public get players(): Array<PlayerGameModel> {
        return this._players
    }

    public removePlayer(player: PlayerGameModel): void {
        for (let i = 0; i < this.players.length; i++) {
            if (this.players[i] == player) {
                this.players.splice(i, 1)

                break
            }
        }
    }

    public addPlayer(player: PlayerGameModel): void {
        this.players.push(player)
    }

    public getPlayer(userId: string): PlayerGameModel | undefined {
        return this.players.find((player: PlayerGameModel) => player.userId == userId)
    }
}