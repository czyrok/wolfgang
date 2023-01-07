import { FactoryCardGameModel } from '../factory/model/factory.card.game.model'
import { PlayerGameModel } from '../../player/model/player.game.model'

import { ConfigCardGameInterface } from '../config/interface/config.card.game.interface'
import { HandlerPlayerGameInterface } from '../../player/handler/interface/handler.player.game.interface'

export class CardGameModel implements HandlerPlayerGameInterface {
    private _playerList: Array<PlayerGameModel> = new Array

    public constructor(
        private readonly _config: ConfigCardGameInterface
    ) {
        FactoryCardGameModel.instance.register(this.config.type, this)
    }

    public get config(): ConfigCardGameInterface {
        return this._config
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