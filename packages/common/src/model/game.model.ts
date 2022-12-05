import { PlayerGameModel } from '../game/player/model/player.game.model'
import { RulesGameModel } from '../game/rules/model/rules.game.model'

export class GameModel {
    private _id!: string
    private _playerGameList!: Array<PlayerGameModel>
    private _rulesGame!: RulesGameModel
    
    public constructor(id: string, rulesGame: RulesGameModel) {
        this._id = id
        this._rulesGame = rulesGame
    }

    public set id(value: string) {
        this._id = value
    }

    public set rulesGame(value: RulesGameModel) {
        this._rulesGame = value
    }

    public get id(): string {
        return this._id
    }

    public get rulesGame(): RulesGameModel {
        return this._rulesGame
    }
}