import { PlayerGameModel, HandlerPlayerGameInterface, CardPlayerGameModel, TypeChatGameEnum } from 'common'

import { ContextGameModel } from '../../../../../context/model/context.game.model'

import { StrategyCampPlayerGameInteface } from '../../../../../player/camp/strategy/interface/strategy.camp.player.game.interface'
import { HandlerCardPlayerGameInterface } from '../../../../../player/card/handler/interface/handler.card.player.game.interface'
import { StrategyItemLoopGameInterface } from '../../../strategy/interface/strategy.item.loop.game.interface'

import { ResultSetGameType } from '../../../../../set/result/type/result.set.game.type'

export abstract class BehaviorCardItemLoopGameModel implements
    StrategyItemLoopGameInterface,
    HandlerCardPlayerGameInterface,
    HandlerPlayerGameInterface {
    private _players: Array<PlayerGameModel> = new Array

    public constructor(
        private _key: string,
        private _campHierarchy: number,
        private _timer: number,
        private _cardList: Array<CardPlayerGameModel>,
        private _chat?: TypeChatGameEnum,
        private _campStrategy?: StrategyCampPlayerGameInteface,
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

    public get chat(): TypeChatGameEnum | undefined {
        return this._chat
    }

    public get campStrategy(): StrategyCampPlayerGameInteface | undefined {
        return this._campStrategy
    }

    public get players(): Array<PlayerGameModel> {
        return this._players
    }

    private set players(value: Array<PlayerGameModel>) {
        this._players = value
    }

    public setupPlayers(): void {
        for (const card of this.cardList) this.players.push(...card.getPlayer())
    }

    public abstract validCondition(context: ContextGameModel): boolean
    public abstract doAtBeginning(context: ContextGameModel): void
    public abstract doAtEnd(context: ContextGameModel): void

    entryPoint(context: ContextGameModel): void {
        console.log('BEHAVAIOR_ENTRYPOINT83')

        let childContext1: ContextGameModel = ContextGameModel.buildContext(context)

        childContext1.res.subscribeOne((result: ResultSetGameType) => {
            let childContext2: ContextGameModel = ContextGameModel.buildContext(context, result)

            childContext2.res.subscribeOne((result: ResultSetGameType) => {
                console.log('BEHAVIOR_TIMER76')
                context.next(result)
            })

            setTimeout(() => {
                this.doAtEnd(childContext2)
            }, this.timer * 1000)

            console.log('BEHAVIOR_TIMER83')
        })

        this.doAtBeginning(childContext1)
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
        for (let currentPlayer of this.players) {
            if (player == currentPlayer) return true
        }

        return false
    }

    getPlayer(): Array<PlayerGameModel> {
        return this.players
    }
}