import { PlayerGameModel } from '../player/model/player.game.model'
import { RulesGameModel } from '../rules/model/rules.game.model'

export class GameModel {
    private _rulesGame: RulesGameModel = new RulesGameModel
    private _playerGameList: Array<PlayerGameModel> = new Array

    public get playerGameList(): Array<PlayerGameModel> {
        return this._playerGameList
    }

    public get rulesGame(): RulesGameModel {
        return this._rulesGame
    }
}