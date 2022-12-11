import { CardPlayerGameModel } from '../../../../../player/card/model/card.player.game.model'
import { PlayerGameModel } from '../../../../../player/model/player.game.model'
import { ContextParamItemLoopGameModel } from '../../../param/context/model/context.param.item.loop.game.model'
import { ContextParamBehaviorCardItemLoopGameModel } from '../param/context/model/context.param.behavior.card.item.loop.game.model'

import { StrategyCampPlayerGameInteface } from '../../../../../player/camp/strategy/interface/strategy.camp.player.game.interface'
import { HandlerCardPlayerGameInterface } from '../../../../../player/card/handler/interface/handler.card.player.game.interface'
import { HandlerPlayerGameInterface } from '../../../../../player/handler/interface/handler.player.game.interface'

import { TimerModeBehaviorCardItemLoopGameEnum } from '../timer-mode/enum/timer-mode.behavior.card.item.loop.game.enum'

import { ResultSetItemLoopGameType } from '../../../set/result/type/result.set.item.loop.game.type'
import { StrategyItemLoopGameInterface } from '../../../strategy/interface/strategy.item.loop.game.interface'

export abstract class BehaviorCardItemLoopGameModel implements
    StrategyItemLoopGameInterface<ContextParamItemLoopGameModel, ContextParamBehaviorCardItemLoopGameModel>,
    HandlerCardPlayerGameInterface,
    HandlerPlayerGameInterface {
    public constructor(
        private _key: string,
        private _campHierarchy: number,
        private _timer: number,
        private _cardList: Array<CardPlayerGameModel>,
        private _campStrategy: StrategyCampPlayerGameInteface
    ) { }

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

    public get campStrategy(): StrategyCampPlayerGameInteface {
        return this._campStrategy
    }

    public abstract validCondition(context: ContextParamItemLoopGameModel): boolean
    public abstract doAtBeginning(context: ContextParamItemLoopGameModel): void
    public abstract doAtEnd(context: ContextParamItemLoopGameModel): void

    entryPoint(context: ContextParamItemLoopGameModel): void {
        let childContext1: ContextParamBehaviorCardItemLoopGameModel = this.buildContext(context)

        childContext1.res.subscribeOne((result: ResultSetItemLoopGameType) => {
            let childContext2: ContextParamBehaviorCardItemLoopGameModel = this.buildContext(context, result)

            childContext2.res.subscribeOne((result: ResultSetItemLoopGameType) => {
                context.next(result)
            })

            setTimeout(() => {
                this.doAtEnd(childContext2)
            }, this.timer)
        })

        this.doAtBeginning(childContext1)
    }

    buildContext(
        parentContext: ContextParamItemLoopGameModel,
        preivousResult?: ResultSetItemLoopGameType
    ): ContextParamBehaviorCardItemLoopGameModel {
        return new ContextParamBehaviorCardItemLoopGameModel(
            parentContext,
            preivousResult
        )
    }

    hasCard(value: CardPlayerGameModel): boolean {
        for (const card of this.cardList) {
            if (card == value) return true
        }

        return false
    }

    getCard(): Array<CardPlayerGameModel> {
        return this.cardList
    }

    hasPlayer(player: PlayerGameModel): boolean {
        let result: boolean = false

        for (const card of this.cardList) {
            result = card.hasPlayer(player)

            if (result === true) break
        }

        return result
    }

    getPlayer(): Array<PlayerGameModel> {
        let list: Array<PlayerGameModel> = new Array

        for (const card of this.cardList) list.push(...card.getPlayer())

        return list
    }
}