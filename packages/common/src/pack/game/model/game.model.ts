import { Subject, Subscription } from 'rxjs'
import { Exclude, Expose } from 'class-transformer'

import { LogUtil } from '../../log/util/log.util'

import { ExecutorGameModel } from '../executor/model/executor.game.model'
import { StateGameModel } from '../state/model/state.game.model'
import { PlayerGameModel } from '../player/model/player.game.model'
import { HandlerPlayerGameModel } from '../player/handler/model/handler.player.game.model'

import { TypeLogEnum } from '../../log/type/enum/type.log.enum'
import { UserModel } from '../../user/model/user.model'

@Exclude()
export class GameModel {
    private static _instance?: GameModel

    @Expose()
    private _id?: string
    
    private _executor: ExecutorGameModel = new ExecutorGameModel

    @Expose()
    private _state: StateGameModel = new StateGameModel

    private _stateChange: Subject<GameModel> = new Subject()

    private constructor() {
        this.state.onChange(() => {
            this.stateChange.next(this)
        })

        LogUtil.logger(TypeLogEnum.GAME).trace('Game initialized')
    }

    public static get instance(): GameModel {
        if (this._instance === undefined) this._instance = new GameModel

        return this._instance
    }

    public get id(): string | undefined {
        return this._id
    }

    public set id(value: string | undefined) {
        this._id = value
    }

    private get executor(): ExecutorGameModel {
        return this._executor
    }

    public get state(): StateGameModel {
        return this._state
    }

    private get stateChange(): Subject<GameModel> {
        return this._stateChange
    }

    public newPlayer(user: UserModel, socketId: string): boolean {
        if (this.state.rules.playerCountMax == this.state.players.length
            || this.executor.isStarted) return false

        let player: PlayerGameModel = new PlayerGameModel(user, socketId)

        HandlerPlayerGameModel.instance.addPlayer(player)

        LogUtil.logger(TypeLogEnum.GAME).info(`${user.username} joined the game`)

        if (this.state.rules.playerCountMax == HandlerPlayerGameModel.instance.players.length) {
            this.executor.prelaunch(this.state)
            this.executor.start()
        }

        return true
    }

    public onStateChange(callback: (game: GameModel) => void): Subscription {
        return this.stateChange.subscribe(callback)
    }
}