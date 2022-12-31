import { PlayerGameModel } from '../../player/model/player.game.model'

import { HandlerPlayerGameInterface } from '../../player/handler/interface/handler.player.game.interface'

export class CardGameModel implements HandlerPlayerGameInterface {
    private _playerList: Array<PlayerGameModel> = new Array

    public constructor(private _key: string) { }

    public get key(): string {
        return this._key
    }

    public get playerList(): Array<PlayerGameModel> {
        return this._playerList
    }

    public addPlayer(player: PlayerGameModel): void {
        // #nsm
        //player.card = this

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