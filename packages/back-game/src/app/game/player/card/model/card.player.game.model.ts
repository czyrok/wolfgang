import { HandlerPlayerGameInterface } from '../../handler/interface/handler.player.game.interface'
import { PlayerGameModel } from '../../model/player.game.model'

export class CardPlayerGameModel implements HandlerPlayerGameInterface {
    private _playerList: Array<PlayerGameModel> = new Array

    public constructor(private _key: string) { }

    public get key(): string {
        return this._key
    }

    public get playerList(): Array<PlayerGameModel> {
        return this._playerList
    }

    public addPlayer(player: PlayerGameModel): void {
        player.card = this

        this.playerList.push(player)
    }

    hasPlayer(value: PlayerGameModel): boolean {
        for (const player of this.playerList) {
            if (player == value) return true
        }

        return false
    }

    getPlayer(): Array<PlayerGameModel> {
        return this.playerList
    }
}