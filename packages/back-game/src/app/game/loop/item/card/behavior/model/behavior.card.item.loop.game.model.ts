import { CardPlayerGameModel } from '../../../../../player/card/model/card.player.game.model'
import { PlayerGameModel } from '../../../../../player/model/player.game.model'

import { StrategyCampPlayerGameInteface } from '../../../../../player/camp/strategy/interface/strategy.camp.player.game.interface'
import { HandlerCardPlayerGameInterface } from '../../../../../player/card/handler/interface/handler.card.player.game.interface'
import { HandlerPlayerGameInterface } from '../../../../../player/handler/interface/handler.player.game.interface'
import { ExecuteLoopGameInterface } from '../../../../execute/interface/execute.loop.game.interface'
import { StrategyBehaviorCardPItemLoopGameInterface } from '../strategy/interface/strategy.behavior.card.item.loop.game.interface'

export class BehaviorCardItemLoopGameModel implements ExecuteLoopGameInterface, HandlerCardPlayerGameInterface, HandlerPlayerGameInterface {
    public constructor(
        private _key: string,
        private _campHierarchy: number,
        private _timer: number,
        private _cardList: Array<CardPlayerGameModel>,
        private _behaviorStrategy: StrategyBehaviorCardPItemLoopGameInterface,
        private _campStrategy: StrategyCampPlayerGameInteface
    ) { }

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

    public set behaviorStrategy(value: StrategyBehaviorCardPItemLoopGameInterface) {
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

    public get behaviorStrategy(): StrategyBehaviorCardPItemLoopGameInterface {
        return this._behaviorStrategy
    }

    public get campStrategy(): StrategyCampPlayerGameInteface {
        return this._campStrategy
    }

    execute(): void {
        this.behaviorStrategy.execute()
    }

    hasCard(value: CardPlayerGameModel): boolean {
        for (let card of this.cardList) {
            if (card == value) return true
        }

        return false
    }

    hasPlayer(player: PlayerGameModel): boolean {
        let result: boolean = false

        for (let card of this.cardList) {
            result = card.hasPlayer(player)

            if (result === true) break
        }

        return result
    }
}