import { PlayerGameModel } from '../../player/model/player.game.model'
import { RulesGameModel } from '../../rules/model/rules.game.model'

import { TypeBehaviorCardItemLoopGameEnum } from '../../loop/item/card/behavior/type/enum/type.behavior.card.item.loop.game.enum'

// #amet
export class StateGameModel {
    private _currentCardBehaviorType: Array<TypeBehaviorCardItemLoopGameEnum> = new Array
    private _isNight: boolean = false
    private _players: Array<PlayerGameModel> = new Array
    private _rules: RulesGameModel = new RulesGameModel

    public set isNight(value: boolean) {
        this._isNight = value
    }

    public set currentCardBehaviorType(value: Array<TypeBehaviorCardItemLoopGameEnum>) {
        this._currentCardBehaviorType = value
    }

    public set players(value: Array<PlayerGameModel>) {
        this._players = value
    }

    public get isNight(): boolean {
        return this._isNight
    }

    public get currentCardBehaviorType(): Array<TypeBehaviorCardItemLoopGameEnum> {
        return this._currentCardBehaviorType
    }

    public get players(): Array<PlayerGameModel> {
        return this._players
    }

    public get rules(): RulesGameModel {
        return this._rules
    }
}