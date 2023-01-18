import { Subscription } from 'rxjs'
import { Exclude, Expose } from 'class-transformer'
import { v4 } from 'uuid'

import { LogUtil } from '../../log/util/log.util'

import { ExecutorGameModel } from '../executor/model/executor.game.model'
import { StateGameModel } from '../state/model/state.game.model'
import { PlayerGameModel } from '../player/model/player.game.model'
import { HandlerPlayerGameModel } from '../player/handler/model/handler.player.game.model'

import { TypeLogEnum } from '../../log/type/enum/type.log.enum'

@Exclude()
export class GameModel {
    private static _instance?: GameModel

    @Expose()
    private _id: string = v4()
    private _executor: ExecutorGameModel = new ExecutorGameModel

    @Expose()
    private _state: StateGameModel = new StateGameModel

    private constructor() {
        LogUtil.logger(TypeLogEnum.GAME).trace('Game initialized')
    }

    public static get instance(): GameModel {
        if (this._instance === undefined) this._instance = new GameModel

        return this._instance
    }

    public get id(): string {
        return this._id
    }

    private get executor(): ExecutorGameModel {
        return this._executor
    }

    public get state(): StateGameModel {
        return this._state
    }

    public newPlayer(username: string, socketId: string): boolean {
        if (this.state.rules.playerCountMax == this.state.players.length
            || this.executor.isStarted) return false

        let player: PlayerGameModel = new PlayerGameModel(username, socketId)

        HandlerPlayerGameModel.instance.addPlayer(player)

        LogUtil.logger(TypeLogEnum.GAME).info(`${username} joined the game`)

        if (this.state.rules.playerCountMax == HandlerPlayerGameModel.instance.players.length) {
            this.executor.prelaunch(this.state)
            this.executor.start()
        }

        return true
    }

    public onStateChange(callback: (state: StateGameModel) => void): Subscription {
        return this.state.onChange(callback)
    }
}