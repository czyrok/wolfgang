import { PlayerGameModel } from '../player/model/player.game.model'
import { RulesGameModel } from '../rules/model/rules.game.model'

export class GameModel {
    private _rulesGame: RulesGameModel = new RulesGameModel()
    private _playerGameList: Array<PlayerGameModel> = new Array()

    public set playerGameList(value: Array<PlayerGameModel>) {
        this._playerGameList = value
    }

    public set rulesGame(value: RulesGameModel) {
        this._rulesGame = value
    }

    public get playerGameList(): Array<PlayerGameModel> {
        return this._playerGameList
    }

    public get rulesGame(): RulesGameModel {
        return this._rulesGame
    }
}