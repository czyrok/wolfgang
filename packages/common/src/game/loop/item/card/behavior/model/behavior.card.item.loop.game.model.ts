import { LogUtil } from '../../../../../../log/util/log.util'

import { ContextGameModel } from '../../../../../context/model/context.game.model'
import { PlayerGameModel } from '../../../../../player/model/player.game.model'
import { CardGameModel } from '../../../../../card/model/card.game.model'

import { HandlerPlayerGameInterface } from '../../../../../player/handler/interface/handler.player.game.interface'
import { StrategyCampPlayerGameInterface } from '../../../../../player/camp/strategy/interface/strategy.camp.player.game.interface'
import { HandlerCardGameInterface } from '../../../../../card/handler/interface/handler.card.game.interface'
import { StrategyItemLoopGameInterface } from '../../../strategy/interface/strategy.item.loop.game.interface'

import { TypeLogEnum } from '../../../../../../log/type/enum/type.log.enum'
import { TypeBehaviorCardItemLoopGameEnum } from '../type/enum/type.behavior.card.item.loop.game.enum'
import { TypeChatGameEnum } from '../../../../../chat/type/enum/type.chat.game.enum'

import { ResultSetGameType } from '../../../../../set/result/type/result.set.game.type'

export abstract class BehaviorCardItemLoopGameModel implements
    StrategyItemLoopGameInterface,
    HandlerCardGameInterface,
    HandlerPlayerGameInterface {
    private _players: Array<PlayerGameModel> = new Array

    public constructor(
        private _type: TypeBehaviorCardItemLoopGameEnum,
        private _campHierarchy: number,
        private _timer: number,
        private _cardList: Array<CardGameModel>,
        private _chat?: TypeChatGameEnum,
        private _campStrategy?: StrategyCampPlayerGameInterface,
    ) { }

    public get type(): TypeBehaviorCardItemLoopGameEnum {
        return this._type
    }

    public get campHierarchy(): number {
        return this._campHierarchy
    }

    public get timer(): number {
        return this._timer
    }

    public get cardList(): Array<CardGameModel> {
        return this._cardList
    }

    public get chat(): TypeChatGameEnum | undefined {
        return this._chat
    }

    public get campStrategy(): StrategyCampPlayerGameInterface | undefined {
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
        LogUtil.logger(TypeLogEnum.GAME).info(`${this.type} behavior entrypoint triggered`)

        let childContext1: ContextGameModel = ContextGameModel.buildContext(context)

        childContext1.res.subscribeOne((result: ResultSetGameType) => {
            let childContext2: ContextGameModel = ContextGameModel.buildContext(context, result)

            childContext2.res.subscribeOne((result: ResultSetGameType) => {
                LogUtil.logger(TypeLogEnum.GAME).info(`${this.type} behavior ending`)

                context.next(result)
            })

            setTimeout(() => {
                this.doAtEnd(childContext2)
            }, this.timer * 1000)
        })

        this.doAtBeginning(childContext1)
    }

    hasCard(value: CardGameModel): boolean {
        for (const card of this.cardList) {
            if (card == value) return true
        }

        return false
    }

    getCard(): Array<CardGameModel> {
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