import { Subject, Subscription } from 'rxjs'

import { HandlerPlayerGameModel } from '../../player/handler/model/handler.player.game.model'
import { PlayerGameModel } from '../../player/model/player.game.model'
import { RulesGameModel } from '../../rules/model/rules.game.model'

import { ChangeInterface } from '../../change/interface/change.interface'

import { TypeBehaviorCardItemLoopGameEnum } from '../../loop/item/card/behavior/type/enum/type.behavior.card.item.loop.game.enum'
import { Exclude, Expose } from 'class-transformer'

@Exclude()
export class StateGameModel implements ChangeInterface<StateGameModel> {
    @Expose()
    private _currentCardBehaviorType: Array<TypeBehaviorCardItemLoopGameEnum> = new Array

    @Expose()
    private _isNight: boolean = false

    @Expose()
    private _players: Array<PlayerGameModel> = new Array

    @Expose()
    private _rules: RulesGameModel = new RulesGameModel
    
    private _stateChange: Subject<StateGameModel> = new Subject()

    public constructor() {
        HandlerPlayerGameModel.instance.onChange((players: Array<PlayerGameModel>) => {
            this.players = players
        })
    }

    public set isNight(value: boolean) {
        this._isNight = value

        this.stateChange.next(this)
    }

    public set currentCardBehaviorType(value: Array<TypeBehaviorCardItemLoopGameEnum>) {
        this._currentCardBehaviorType = value

        this.stateChange.next(this)
    }

    public set players(value: Array<PlayerGameModel>) {
        this._players = value
        
        this.stateChange.next(this)
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

    private get stateChange(): Subject<StateGameModel> {
        return this._stateChange
    }

    onChange(callback: (state: StateGameModel) => void): Subscription {
        return this.stateChange.subscribe(callback)
    }
}