import { Subject, Subscription } from 'rxjs'
import { v4 } from 'uuid'
import { DocumentType, getModelForClass, prop } from '@typegoose/typegoose'
import { Exclude, Expose, instanceToPlain } from 'class-transformer'
import { Namespace, Socket } from 'socket.io'

import { UndefinedNamespaceGameError } from '../error/undefined-namespace.game.error'

import { LogUtil } from '../../log/util/log.util'

import { RoomChatGameHelper } from '../chat/room/helper/room.chat.game.helper'

import { DocumentModel } from '../../model/document.model'
import { ExecutorGameModel } from '../executor/model/executor.game.model'
import { StateGameModel } from '../state/model/state.game.model'
import { PlayerGameModel } from '../player/model/player.game.model'
import { HandlerPlayerGameModel } from '../player/handler/model/handler.player.game.model'
import { UserModel, UserModelDocument } from '../../user/model/user.model'
import { BehaviorItemLoopGameModel } from '../loop/item/behavior/model/behavior.item.loop.game.model'
import { IteratorLoopGameModel } from '../loop/iterator/model/iterator.loop.game.model'
import { UserMessageChatGameModel } from '../chat/message/user/model/user.message.chat.game.model'
import { ChatGameModel, ChatGameModelDocument } from '../chat/model/chat.game.model'
import { EventMessageChatGameModel } from '../chat/message/event/model/event.message.chat.game.model'

import { TypeLogEnum } from '../../log/type/enum/type.log.enum'
import { TypeChatGameEnum } from '../chat/type/enum/type.chat.game.enum'

@Exclude()
export class GameModel extends DocumentModel {
    private static _instance?: GameModel

    @Expose()
    @prop({ required: true })
    private _gameId: string = v4()

    @Expose()
    @prop({ required: true })
    private _creationCode?: string

    private _namespace?: Namespace

    @Expose()
    @prop({ required: true, default: new Date })
    private _releaseDate: Date = new Date

    @Expose()
    private _executor: ExecutorGameModel = new ExecutorGameModel

    @Expose()
    private _state: StateGameModel = new StateGameModel

    private _stateChange: Subject<GameModel> = new Subject()

    public constructor() {
        super()

        this.state.onChange(() => {
            this.stateChange.next(this)
        })
    }

    public static get instance(): GameModel {
        if (this._instance === undefined) this._instance = new GameModel

        return this._instance
    }

    @Expose()
    public get gameId(): string {
        return this._gameId
    }

    @Expose()
    public get creationCode(): string | undefined {
        return this._creationCode
    }

    public set creationCode(value: string | undefined) {
        this._creationCode = value

        this.stateChange.next(this)
    }

    public get namespace(): Namespace | undefined {
        return this._namespace
    }

    public set namespace(value: Namespace | undefined) {
        this._namespace = value

        this.stateChange.next(this)
    }

    @Expose()
    public get releaseDate(): Date {
        return this._releaseDate
    }

    @Expose()
    private get executor(): ExecutorGameModel {
        return this._executor
    }

    public get isStarted(): boolean {
        return this.state.isStarted
    }

    public get isFinished(): boolean {
        return this.state.isFinished
    }

    @Expose()
    public get state(): StateGameModel {
        return this._state
    }

    private get stateChange(): Subject<GameModel> {
        return this._stateChange
    }

    public async newPlayer(user: UserModel, socket: Socket): Promise<boolean> {
        LogUtil.logger(TypeLogEnum.GAME).fatal(`ddd ${user._id}`)
        const checkPlayer: PlayerGameModel | null = this.checkPlayer(user._id)
        LogUtil.logger(TypeLogEnum.GAME).fatal(`ddd2 ${checkPlayer ? 'oui' : 'non'}`)

        if (checkPlayer) {
            checkPlayer.socketsList.push(socket)

            if (!this.namespace) throw new UndefinedNamespaceGameError

            RoomChatGameHelper.setRoom(checkPlayer)

            LogUtil.logger(TypeLogEnum.GAME).info(`${user.username} reconnected to the game ${this.gameId}`)

            return true
        }

        if (this.state.rules.playerCountMax === this.state.players.length
            || this.state.isStarted) return false

        const player: PlayerGameModel = new PlayerGameModel(user)

        player.socketsList.push(socket)

        HandlerPlayerGameModel.instance.addPlayer(player)

        if (!this.namespace) throw new UndefinedNamespaceGameError

        RoomChatGameHelper.setRoom(player)

        LogUtil.logger(TypeLogEnum.GAME).info(`${user.username} joined the game ${this.gameId}`)

        if (this.state.rules.playerCountMax == HandlerPlayerGameModel.instance.players.length) {
            if (!this.namespace) throw new UndefinedNamespaceGameError

            await this.executor.prelaunch(this.namespace, this.state)

            this.executor.start(this.state)
        }

        return true
    }

    public connectionLost(user: UserModel, socketId: string): boolean {
        const player: PlayerGameModel | null = this.checkPlayer(user._id)

        if (!player) return false

        const socket: Array<Socket> = player.socketsList.filter((socket: Socket) => socket.id === socketId)

        if (socket.length === 0) return false

        const index: number = player.socketsList.indexOf(socket[0])

        player.socketsList.splice(index, 1)

        if (this.isStarted || player.socketsList.length > 0) return false

        HandlerPlayerGameModel.instance.removePlayer(player)

        LogUtil.logger(TypeLogEnum.GAME).info(`${user.username} left the game ${this.gameId}`)

        return true
    }

    public checkPlayer(userId: string): PlayerGameModel | null {
        for (const player of this.state.players) {
            LogUtil.logger(TypeLogEnum.GAME).fatal(`ddd3???? ${player.user._id} ${userId}`)

            if (player.user._id.toString() == userId) {
                LogUtil.logger(TypeLogEnum.GAME).fatal(`PASWTF`)
                //LogUtil.logger(TypeLogEnum.GAME).error(`${player.user._id} ${userId}`)
                return player
            }
        }

        return null
    }

    public getChatOfPlayer(player: PlayerGameModel): Array<TypeChatGameEnum> {
        const loopIte: IteratorLoopGameModel = new IteratorLoopGameModel

        const behaviorList: Array<BehaviorItemLoopGameModel> = new Array,
            chatTypeList: Array<TypeChatGameEnum> = new Array

        for (const item of loopIte) {
            behaviorList.push(...item.getPlayerBehavior(player))
        }

        for (const behavior of behaviorList) {
            chatTypeList.push(...behavior.getChatType())
        }

        return chatTypeList
    }

    public async sendPlayerMessage(player: PlayerGameModel, chatType: TypeChatGameEnum, text: string): Promise<boolean> {
        const chat: DocumentType<ChatGameModel> | null = await ChatGameModelDocument.getChat(this.gameId, chatType)

        // #achan
        if (!chat) throw Error

        // Vérification !!!

        const messageDoc: DocumentType<UserMessageChatGameModel> = await chat.sendUserMessage(new UserModelDocument(player.user), text),
            message: Array<UserMessageChatGameModel> = [messageDoc.toObject()]

        if (!this.namespace) throw new UndefinedNamespaceGameError

        const messageObj: any = instanceToPlain(message)

        this.namespace.to(chatType).emit('getChat', messageObj)

        return true
    }

    public async sendEventMessage(text: string, imageUrl: string): Promise<boolean> {
        const chat: DocumentType<ChatGameModel> | null = await ChatGameModelDocument.getChat(this.gameId, TypeChatGameEnum.ALIVE)

        // #achan
        if (!chat) throw Error

        // Vérification !!!

        const messageDoc: DocumentType<EventMessageChatGameModel> = await chat.sendEventMessage(text, imageUrl)

        const test: EventMessageChatGameModel = messageDoc.toObject()

        const message: Array<EventMessageChatGameModel> = [test]

        if (!this.namespace) throw new UndefinedNamespaceGameError

        const messageObj: any = instanceToPlain(message)

        LogUtil.logger(TypeLogEnum.GAME).warn('sendevemessc', messageObj)

        this.namespace.to(TypeChatGameEnum.ALIVE).emit('getChat', messageObj)

        return true
    }

    public onStateChange(callback: (game: GameModel) => void): Subscription {
        return this.stateChange.subscribe(callback)
    }
}

export const GameModelDocument = getModelForClass(GameModel, { schemaOptions: { collection: 'game' } })