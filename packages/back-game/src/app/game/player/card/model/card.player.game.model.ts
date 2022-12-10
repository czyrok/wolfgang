import { HandlerPlayerGameInterface } from '../../handler/interface/handler.player.game.interface'
import { PlayerGameModel } from '../../model/player.game.model'

export class CardPlayerGameModel implements HandlerPlayerGameInterface {
    private _key: string
    private _playerList: Array<PlayerGameModel> = new Array()

    public constructor(key: string) {
        this._key = key
    }

    public set key(value: string) {
        this._key = value
    }

    public set playerList(value: Array<PlayerGameModel>) {
        this._playerList = value
    }

    public get key(): string {
        return this._key
    }

    public get playerList(): Array<PlayerGameModel> {
        return this._playerList
    }

    addPlayer(value: PlayerGameModel): void {
        this.playerList.push(value)
    }

    hasPlayer(value: PlayerGameModel): boolean {
        for(let player of this.playerList) {
            if (player == value) {
                return true
            }
        }
        return false
    }
}