import { CardPlayerGameModel } from '../../../../../player/card/model/card.player.game.model'
import { PlayerGameModel } from '../../../../../player/model/player.game.model'
import { ContextParamItemLoopGameModel } from '../../../param/context/model/context.param.item.loop.game.model'
import { ResultSetItemLoopGameModel } from '../../../set/result/model/result.set.item.loop.game.model'
import { ContextParamBehaviorCardItemLoopGameModel } from '../param/context/model/context.param.behavior.card.item.loop.game.model'

import { StrategyCampPlayerGameInteface } from '../../../../../player/camp/strategy/interface/strategy.camp.player.game.interface'
import { HandlerCardPlayerGameInterface } from '../../../../../player/card/handler/interface/handler.card.player.game.interface'
import { HandlerPlayerGameInterface } from '../../../../../player/handler/interface/handler.player.game.interface'
import { StrategyBehaviorCardPItemLoopGameInterface } from '../strategy/interface/strategy.behavior.card.item.loop.game.interface'
import { StrategyItemLoopGameInterface } from '../../../strategy/interface/strategy.item.loop.game.interface'

import { TimerModeBehaviorCardItemLoopGameEnum } from '../timer-mode/enum/timer-mode.behavior.card.item.loop.game.enum'
import { ResultSetItemLoopGameType } from '../../../set/result/type/result.set.item.loop.game.type'
import { CallbackContextParamItemLoopGameType } from '../../../param/context/callback/type/callback.context.param.item.loop.game.type'

export abstract class BehaviorCardItemLoopGameModel implements StrategyItemLoopGameInterface<ContextParamItemLoopGameModel, ContextParamBehaviorCardItemLoopGameModel>, HandlerCardPlayerGameInterface, HandlerPlayerGameInterface {
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

    abstract execute(context: ContextParamItemLoopGameModel): void

    buildContext(
        parentContext: ContextParamItemLoopGameModel,
        callback: CallbackContextParamItemLoopGameType,
        result?: ResultSetItemLoopGameType
    ): ContextParamBehaviorCardItemLoopGameModel {
        return new ContextParamBehaviorCardItemLoopGameModel(
            parentContext.next,
            callback,
            this.timer,
            TimerModeBehaviorCardItemLoopGameEnum.BETWEEN,
            // adef
            [],
            parentContext,
            result
        )
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