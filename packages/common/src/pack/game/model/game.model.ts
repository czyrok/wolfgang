import { Subject, Subscription } from 'rxjs'
import { v4 } from 'uuid'
import { getModelForClass, prop } from '@typegoose/typegoose'
import { Exclude, Expose } from 'class-transformer'
import { Namespace, Socket } from 'socket.io'

import { UndefinedNamespaceGameError } from '../error/undefined-namespace.game.error'

import { LogUtil } from '../../log/util/log.util'

import { RoomChatGameHelper } from '../chat/room/helper/room.chat.game.helper'

import { DocumentModel } from '../../model/document.model'
import { ExecutorGameModel } from '../executor/model/executor.game.model'
import { StateGameModel } from '../state/model/state.game.model'
import { PlayerGameModel } from '../player/model/player.game.model'
import { HandlerPlayerGameModel } from '../player/handler/model/handler.player.game.model'
import { UserModel } from '../../user/model/user.model'
import { StorageVotePlayerGameModel } from '../player/vote/storage/model/storage.vote.player.game.model'
import { ManagerChatGameModel } from '../chat/manager/model/manager.chat.game.model'

import { TypeLogEnum } from '../../log/type/enum/type.log.enum'
import { StageStateGameEnum } from '../state/stage/enum/stage.state.game.enum'
import { UserHelper } from '../../user/helper/user.helper'

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

    private _voteStorage: StorageVotePlayerGameModel = new StorageVotePlayerGameModel

    private _chatManager: ManagerChatGameModel = new ManagerChatGameModel(this)

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

    public get voteStorage(): StorageVotePlayerGameModel {
        return this._voteStorage
    }

    public get chatManager(): ManagerChatGameModel {
        return this._chatManager
    }

    public get stage(): StageStateGameEnum {
        return this.state.stage
    }

    @Expose()
    public get state(): StateGameModel {
        return this._state
    }

    private get stateChange(): Subject<GameModel> {
        return this._stateChange
    }

    public async joinGame(user: UserModel, socket: Socket): Promise<boolean> {
        const checkPlayer: PlayerGameModel | null = this.checkPlayer(user._id)

        if (checkPlayer) {
            checkPlayer.socketsList.push(socket)

            if (!this.namespace) throw new UndefinedNamespaceGameError

            RoomChatGameHelper.setRoom(checkPlayer)

            LogUtil.logger(TypeLogEnum.GAME).info(`${user.username} reconnected to the game ${this.gameId}`)

            return true
        }

        if (this.state.rules.playerCountMax === this.state.players.length
            || this.stage !== StageStateGameEnum.AWAITING) return false

        const player: PlayerGameModel = new PlayerGameModel(user)

        player.socketsList.push(socket)
        
        HandlerPlayerGameModel.instance.addPlayer(player)

        if (!this.namespace) throw new UndefinedNamespaceGameError

        RoomChatGameHelper.setRoom(player)

        LogUtil.logger(TypeLogEnum.GAME).info(`${user.username} joined the game ${this.gameId}`)

        if (this.state.rules.playerCountMax == HandlerPlayerGameModel.instance.players.length) {
            if (!this.namespace) throw new UndefinedNamespaceGameError

            await this.executor.prelaunch(this)

            this.executor.start(this)
        }

        return true
    }

    public leaveGame(user: UserModel, socketId: string): boolean {
        const player: PlayerGameModel | null = this.checkPlayer(user._id)

        if (!player) return false

        const socket: Array<Socket> = player.socketsList.filter((socket: Socket) => socket.id === socketId)

        if (socket.length === 0) return false

        const index: number = player.socketsList.indexOf(socket[0])

        player.socketsList.splice(index, 1)

        if (this.stage === StageStateGameEnum.STARTED || player.socketsList.length > 0) return false

        HandlerPlayerGameModel.instance.removePlayer(player)

        LogUtil.logger(TypeLogEnum.GAME).info(`${user.username} left the game ${this.gameId}`)

        return true
    }

    public checkPlayer(userId: string): PlayerGameModel | null {
        for (const player of this.state.players) {
            if (player.user._id.toString() == userId) return player
        }

        return null
    }

    public onStateChange(callback: (game: GameModel) => void): Subscription {
        return this.stateChange.subscribe(callback)
    }
}

export const GameModelDocument = getModelForClass(GameModel, { schemaOptions: { collection: 'game' } })