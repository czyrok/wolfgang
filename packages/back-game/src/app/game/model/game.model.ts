import { FactoryCardPlayerGameUtil } from '../player/card/factory/util/factory.card.player.game.util'

import { PlayerGameModel } from '../player/model/player.game.model'
import { RulesGameModel } from '../rules/model/rules.game.model'

import { TypeCardPlayerGameEnum } from '../player/card/type/enum/type.card.player.game.enum'

export class GameModel {
    private static _instance: GameModel = new GameModel

    private _isStarted: boolean = false

    private _rules: RulesGameModel = new RulesGameModel
    private _players: Array<PlayerGameModel> = new Array

    private constructor() { }

    public static get instance(): GameModel {
        return this._instance
    }

    public get players(): Array<PlayerGameModel> {
        return this._players
    }

    public get rules(): RulesGameModel {
        return this._rules
    }

    public get isStarted(): boolean {
        return this._isStarted
    }

    public set isStarted(value: boolean) {
        this._isStarted = value
    }

    public async start(): Promise<void> {
        // #achan
        FactoryCardPlayerGameUtil.get(TypeCardPlayerGameEnum.VILLAGER).addPlayer(this.players[0])
        FactoryCardPlayerGameUtil.get(TypeCardPlayerGameEnum.VILLAGER).addPlayer(this.players[1])
        FactoryCardPlayerGameUtil.get(TypeCardPlayerGameEnum.GREY_WEREWOLF).addPlayer(this.players[2])
    }

    public async addPlayer(username: string, socketId: number): Promise<boolean> {
        // #achan
        if (this.rules.playerCountMax == this.players.length) return false

        this.players.push(new PlayerGameModel(username, socketId))

        if (this.rules.playerCountMax == this.players.length) this.start()

        return true
    }
}