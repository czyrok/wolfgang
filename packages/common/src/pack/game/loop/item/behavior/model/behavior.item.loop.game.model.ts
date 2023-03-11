import { LogUtil } from '../../../../../log/util/log.util'

import { FactoryBehaviorItemLoopGameModel } from '../factory/model/factory.behavior.item.loop.game.model'
import { ContextGameModel } from '../../../../context/model/context.game.model'
import { PlayerGameModel } from '../../../../player/model/player.game.model'
import { CardGameModel } from '../../../../card/model/card.game.model'
import { FactoryCardGameModel } from '../../../../card/factory/model/factory.card.game.model'
import { StateGameModel } from '../../../../state/model/state.game.model'
import { ChatGameModelDocument } from '../../../../chat/model/chat.game.model'
import { FactoryItemLoopGameModel } from '../../factory/model/factory.item.loop.game.model'
import { ItemLoopGameModel } from '../../model/item.loop.game.model'

import { ConfigBehaviorItemLoopGameInterface } from '../config/interface/config.behavior.item.loop.game.interface'
import { SetupDistributionGameInterface } from '../../../../distribution/setup/interface/setup.distribution.game.interface'
import { HandlerPlayerGameInterface } from '../../../../player/handler/interface/handler.player.game.interface'
import { HandlerCardGameInterface } from '../../../../card/handler/interface/handler.card.game.interface'
import { StrategyItemLoopGameInterface } from '../../strategy/interface/strategy.item.loop.game.interface'
import { HandlerChatGameInterface } from '../../../../chat/handler/interface/handler.chat.game.interface'

import { TypeLogEnum } from '../../../../../log/type/enum/type.log.enum'
import { TypeModeChatGameEnum } from '../../../../chat/mode/type/enum/type.mode.chat.game.enum'
import { TypeChatGameEnum } from '../../../../chat/type/enum/type.chat.game.enum'

import { ResultSetGameType } from '../../../../set/result/type/result.set.game.type'

export abstract class BehaviorItemLoopGameModel implements
    StrategyItemLoopGameInterface,
    HandlerCardGameInterface,
    HandlerPlayerGameInterface,
    SetupDistributionGameInterface,
    HandlerChatGameInterface {
    private _players: Array<PlayerGameModel> = new Array

    public constructor(
        private readonly _config: ConfigBehaviorItemLoopGameInterface
    ) {
        FactoryBehaviorItemLoopGameModel.instance.register(this.config.type, this)
    }

    public get config(): ConfigBehaviorItemLoopGameInterface {
        return this._config
    }

    public get players(): Array<PlayerGameModel> {
        return this._players
    }

    private set players(value: Array<PlayerGameModel>) {
        this._players = value
    }

    public abstract validCondition(context: ContextGameModel): Promise<boolean>
    public abstract doAtBeginning(context: ContextGameModel): Promise<void>
    public abstract doAtEnd(context: ContextGameModel): Promise<void>

    async entryPoint(context: ContextGameModel): Promise<void> {
        LogUtil.logger(TypeLogEnum.GAME).info(`${this.config.type} behavior entrypoint triggered`)

        const childContext1: ContextGameModel = ContextGameModel.buildContext(context)

        childContext1.res.subscribeOne((result: ResultSetGameType) => {
            const childContext2: ContextGameModel = ContextGameModel.buildContext(context, result)

            childContext2.res.subscribeOne((result: ResultSetGameType) => {
                LogUtil.logger(TypeLogEnum.GAME).info(`${this.config.type} behavior ending`)

                context.next(result)
            })

            setTimeout(async () => {
                await this.doAtEnd(childContext2)
            }, this.config.timer * 1000)
        })

        await this.doAtBeginning(childContext1)
    }

    hasCard(value: CardGameModel): boolean {
        for (let cardType of this.config.cardTypeList) {
            if (cardType == value.config.type) return true
        }

        return false
    }

    getCard(): Array<CardGameModel> {
        return FactoryCardGameModel.instance.getList(this.config.cardTypeList)
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

    setup(): void {
        this.players.splice(0, this.players.length)

        for (const card of FactoryCardGameModel.instance.getList(this.config.cardTypeList)) this.players.push(...card.getPlayer())
    }

    getChatType(): Array<TypeChatGameEnum> {
        const type: TypeChatGameEnum | undefined = this.config.chat

        if (type) return [type]

        return []
    }

    async createChat(gameId: string): Promise<void> {
        if (this.config.chat && this.config.chatMode) await ChatGameModelDocument.createChat(gameId, this.config.chat, this.config.chatMode)
    }

    public static getFirstChatTypeAvailable(state: StateGameModel, behaviorList: Array<BehaviorItemLoopGameModel>): TypeChatGameEnum | null {
        behaviorList = behaviorList.sort((behavior1: BehaviorItemLoopGameModel, behavior2: BehaviorItemLoopGameModel) => behavior1.config.hierarchy < behavior2.config.hierarchy ? 1 : -1)

        for (const behavior of behaviorList) {
            if (behavior.checkChatAvailable(state)) return behavior.config.chat ?? null
        }

        return null
    }

    public static getBehaviorOfPlayer(player: PlayerGameModel): Array<BehaviorItemLoopGameModel> {
        const result: Array<BehaviorItemLoopGameModel> = new Array

        const factory: FactoryItemLoopGameModel = FactoryItemLoopGameModel.instance

        const itemList: Array<ItemLoopGameModel> = factory.getAll()

        for (const item of itemList) {
            result.push(...item.getPlayerBehavior(player))
        }

        return result
    }

    public checkChatAvailable(state: StateGameModel): boolean {
        if (!this.config.chatMode) return false

        if (this.config.chatMode === TypeModeChatGameEnum.ALL) return true
        if (this.config.chatMode === TypeModeChatGameEnum.DAY && !state.isNight) return true
        if (this.config.chatMode === TypeModeChatGameEnum.NIGHT && state.isNight) return true
        if (this.config.chatMode === TypeModeChatGameEnum.ONLY_BEHAVIOR_TURN && state.isCurrentBehavior(this)) return true

        return false
    }
}