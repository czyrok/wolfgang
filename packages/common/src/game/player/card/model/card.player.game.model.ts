import { GamePlayerPlayerGameModel } from '../../model/game-player.player.game.model'

export class CardPlayerGameModel {
    private _key!: string
    private _playerList!: Array<GamePlayerPlayerGameModel>

    public constructor(key: string) {
        this._key = key
    }

    public set key(value: string) {
        this._key = value
    }

    public get key(): string {
        return this._key
    }
}