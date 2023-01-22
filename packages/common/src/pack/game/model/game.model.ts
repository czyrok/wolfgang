import { Subject, Subscription } from 'rxjs'
import { Exclude, Expose } from 'class-transformer'

import { LogUtil } from '../../log/util/log.util'

import { ExecutorGameModel } from '../executor/model/executor.game.model'
import { StateGameModel } from '../state/model/state.game.model'
import { PlayerGameModel } from '../player/model/player.game.model'
import { HandlerPlayerGameModel } from '../player/handler/model/handler.player.game.model'

import { TypeLogEnum } from '../../log/type/enum/type.log.enum'
import { UserModel } from '../../user/model/user.model'
import { v4 } from 'uuid'

@Exclude()
export class GameModel {
    private static _instance?: GameModel

    private _id: string = v4()

    private _creationCode?: string
    
    private _executor: ExecutorGameModel = new ExecutorGameModel

    private _state: StateGameModel = new StateGameModel

    private _stateChange: Subject<GameModel> = new Subject()

    public constructor() {
        this.state.onChange(() => {
            this.stateChange.next(this)
        })
    }

    public static get instance(): GameModel {
        if (this._instance === undefined) this._instance = new GameModel

        return this._instance
    }

    @Expose()
    public get id(): string {
        return this._id
    }

    @Expose()
    public get creationCode(): string | undefined {
        return this._creationCode
    }

    public set creationCode(value: string | undefined) {
        this.stateChange.next(this)

        this._creationCode = value
    }

    private get executor(): ExecutorGameModel {
        return this._executor
    }

    @Expose()
    public get state(): StateGameModel {
        return this._state
    }

    private get stateChange(): Subject<GameModel> {
        return this._stateChange
    }

    public newPlayer(user: UserModel, socketId: string): boolean {
        const checkPlayer: PlayerGameModel | null = this.checkPlayer(user.id)
        
        if (checkPlayer) {
            checkPlayer.socketId = socketId

            return true
        }

        if (this.state.rules.playerCountMax === this.state.players.length
            || this.executor.isStarted) return false

        const player: PlayerGameModel = new PlayerGameModel(user, socketId)

        HandlerPlayerGameModel.instance.addPlayer(player)

        LogUtil.logger(TypeLogEnum.GAME).info(`${user.username} joined the game`)

        if (this.state.rules.playerCountMax == HandlerPlayerGameModel.instance.players.length) {
            this.executor.prelaunch(this.state)
            this.executor.start()
        }

        return true
    }

    public checkPlayer(userId: string): PlayerGameModel | null {
        for (const player of this.state.players) {
            if (player.user.id === userId) return player
        }

        return null
    }

    public onStateChange(callback: (game: GameModel) => void): Subscription {
        return this.stateChange.subscribe(callback)
    }
}