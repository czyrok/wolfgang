import { PlayerGameModel } from '../../player/model/player.game.model'

import { HandlerPlayerGameInterface } from '../../player/handler/interface/handler.player.game.interface'

import { TypeCardGameEnum } from '../type/enum/type.card.game.enum'

export class CardGameModel implements HandlerPlayerGameInterface {
    private _playerList: Array<PlayerGameModel> = new Array

    public constructor(private _type: TypeCardGameEnum) { }

    public get type(): TypeCardGameEnum {
        return this._type
    }

    public get playerList(): Array<PlayerGameModel> {
        return this._playerList
    }

    public addPlayer(player: PlayerGameModel): void {
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