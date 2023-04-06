import { Subject, Subscription } from 'rxjs'
import { Exclude, Expose } from 'class-transformer'

import { HandlerPlayerGameModel } from '../../player/handler/model/handler.player.game.model'
import { PlayerGameModel } from '../../player/model/player.game.model'
import { RulesGameModel } from '../../rules/model/rules.game.model'
import { BehaviorItemLoopGameModel } from '../../loop/item/behavior/model/behavior.item.loop.game.model'

import { ChangeInterface } from '../../change/interface/change.interface'

import { TypeBehaviorItemLoopGameEnum } from '../../loop/item/behavior/type/enum/type.behavior.item.loop.game.enum'
import { HandlerPlayerGameInterface } from '../../player/handler/interface/handler.player.game.interface'
import { StageStateGameEnum } from '../stage/enum/stage.state.game.enum'

@Exclude()
export class StateGameModel implements ChangeInterface<StateGameModel>, HandlerPlayerGameInterface {
    @Expose()
    private _stage: StageStateGameEnum = StageStateGameEnum.AWAITING

    @Expose()
    private _currentBehaviorType: Array<TypeBehaviorItemLoopGameEnum> = new Array

    @Expose()
    private _isNight: boolean = false

    @Expose()
    private _endTurnDate?: Date

    @Expose()
    private _players: Array<PlayerGameModel> = new Array

    @Expose()
    private _rules: RulesGameModel = new RulesGameModel

    private _stateChange: Subject<StateGameModel> = new Subject()

    public constructor() {
        HandlerPlayerGameModel.instance.onChange((players: Array<PlayerGameModel>) => {
            this.players = players

            this.stateChange.next(this)
        })
    }

    public set stage(value: StageStateGameEnum) {
        this._stage = value
    }

    @Expose()
    public get stage(): StageStateGameEnum {
        return this._stage
    }

    public set isNight(value: boolean) {
        this._isNight = value
    }

    @Expose()
    public get isNight(): boolean {
        return this._isNight
    }

    public set endTurnDate(value: Date | undefined) {
        this._endTurnDate = value
    }

    @Expose()
    public get endTurnDate(): Date | undefined {
        return this._endTurnDate
    }

    public set currentBehaviorType(value: Array<TypeBehaviorItemLoopGameEnum>) {
        this._currentBehaviorType = value
    }

    @Expose()
    public get currentBehaviorType(): Array<TypeBehaviorItemLoopGameEnum> {
        return this._currentBehaviorType
    }

    public set players(value: Array<PlayerGameModel>) {
        this._players = value
    }

    @Expose()
    public get players(): Array<PlayerGameModel> {
        return this._players
    }

    @Expose()
    public get rules(): RulesGameModel {
        return this._rules
    }

    private get stateChange(): Subject<StateGameModel> {
        return this._stateChange
    }

    onChange(callback: (state: StateGameModel) => void): Subscription {
        return this.stateChange.subscribe(callback)
    }

    hasPlayer(player: PlayerGameModel): boolean {
        for (let currentPlayer of this.players) {
            if (player == currentPlayer) return true
        }

        return false
    }

    getPlayer(): Array<PlayerGameModel> {
        return this.players
    }

    getAlivePlayer(): Array<PlayerGameModel> {
        return this.players.filter((player: PlayerGameModel) => !player.isDead)
    }

    public notifyUpdate(): void {
        this.stateChange.next(this)
    }

    public isCurrentBehavior(behavior: BehaviorItemLoopGameModel): boolean
    public isCurrentBehavior(behavior: TypeBehaviorItemLoopGameEnum): boolean
    public isCurrentBehavior(behavior: BehaviorItemLoopGameModel | TypeBehaviorItemLoopGameEnum): boolean {
        for (const behaviorType of this.currentBehaviorType) {
            if (behavior instanceof BehaviorItemLoopGameModel && behavior.config.type !== behaviorType) continue
            if (!(behavior instanceof BehaviorItemLoopGameModel) && behavior !== behaviorType) continue
            
            return true
        }

        return false
    }
}