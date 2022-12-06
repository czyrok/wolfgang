import { StrategyCampPlayerGameInteface } from '../../../../../player/camp/strategy/interface/strategy.camp.player.game.interface'
import { CardPlayerGameModel } from '../../../../../player/card/model/card.player.game.model'
import { ExecuteLoopGameInterface } from '../../../../execute/interface/execute.loop.game.interface'
import { StrategyBehaviorCardPItemLoopGamesIntefrace } from '../strategy/interface/strategy.behavior.card.item.loop.game.interface'

export class BehaviorCardItemLoopGameModel implements ExecuteLoopGameInterface {
    private _key: string
    private _campHierarchy: number
    private _timer: number
    private _cardList: Array<CardPlayerGameModel>
    private _behaviorStrategy: StrategyBehaviorCardPItemLoopGamesIntefrace
    private _campStrategy: StrategyCampPlayerGameInteface

    public constructor(key: string, campHierarchy: number, timer: number, behaviorStrategy: StrategyBehaviorCardPItemLoopGamesIntefrace, campStrategy: StrategyCampPlayerGameInteface) {
        this._key = key
        this._campHierarchy = campHierarchy
        this._timer = timer
        this._behaviorStrategy = behaviorStrategy
        this._campStrategy = campStrategy
    }

    public set key(value: string) {
        this._key = value
    }

    public set campHierarchy(value: number) {
        this._campHierarchy = value
    }

    public set timer(value: number) {
        this._timer = this.timer
    }

    public set cardList(value: Array<CardPlayerGameModel>) {
        this._cardList = value
    }

    public set behaviorStrategy(value: StrategyBehaviorCardPItemLoopGamesIntefrace) {
        this._behaviorStrategy = value
    }

    public set campStrategy(value: StrategyCampPlayerGameInteface) {
        this._campStrategy = value
    }

    public get key(): string {
        return this._key
    }

    public get campHierarchy(): number {
        return this._campHierarchy
    }

    public get timer(): number {
        return this._timer
    }

    public get cardList(): Array<CardPlayerGameModel> {
        return this._cardList
    }

    public get behaviorStrategy(): StrategyBehaviorCardPItemLoopGamesIntefrace {
        return this._behaviorStrategy
    }

    public get campStrategy(): StrategyCampPlayerGameInteface {
        return this._campStrategy
    }

    execute(): void {
        this.behaviorStrategy.execute()
    }
}