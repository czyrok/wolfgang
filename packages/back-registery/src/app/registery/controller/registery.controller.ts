import { Socket } from 'socket.io'
import { v4 } from 'uuid'
import { ConnectedSocket, EmitNamespaceBroadcastOnSuccess, EmitOnFail, EmitOnSuccess, MessageBody, OnDisconnect, OnMessage, SkipEmitOnEmptyResult, SocketController } from 'ts-socket.io-controller'
import { GameModel, LogUtil, TypeLogEnum } from 'common'

import { NoAvailableInstanceGameError } from '../../game/instance/error/no-available.instance.game.error'
import { NotFoundInstanceGameError } from '../../game/instance/error/not-found.instance.game.error'

import { ListGamesInstanceGameHelper } from '../../game/instance/games/list/helper/list.games.instance.game.helper'
import { CreationConnectionGameHelper } from '../../game/connection/creation/helper/creation.connection.game.helper'

import { RegisteryModel } from '../model/registery.model'

import { InstanceGameInterface } from '../../game/instance/interface/instance.game.interface'

@SocketController({
    namespace: '/registery',
    init: () => { }
})
export class RegisteryController {
    @OnDisconnect()
    @SkipEmitOnEmptyResult()
    @EmitNamespaceBroadcastOnSuccess('get')
    disconnect(@ConnectedSocket() socket: Socket) {
        if (RegisteryModel.instance[socket.id] === undefined) return

        delete RegisteryModel.instance[socket.id]

        LogUtil.logger(TypeLogEnum.REGISTERY).trace('An instance lost')

        return ListGamesInstanceGameHelper.getAll()
    }

    @OnMessage()
    trigger(@ConnectedSocket() socket: Socket) {
        if (RegisteryModel.instance[socket.id] !== undefined) return

        RegisteryModel.instance[socket.id] = {
            socket: socket,
            games: new Array()
        }

        LogUtil.logger(TypeLogEnum.REGISTERY).trace('A new instance registered')
    }

    @OnMessage()
    @EmitOnSuccess()
    check(@MessageBody() gameId: string) {
        for (const instance of RegisteryModel.instance) {
            if (instance[1].games.filter((game: GameModel) => game.gameId === gameId).length > 0) {
                return true
            }
        }

        return false
    }

    @OnMessage()
    @EmitOnFail()
    @SkipEmitOnEmptyResult()
    @EmitNamespaceBroadcastOnSuccess('get')
    update(@MessageBody() game: GameModel, @ConnectedSocket() socket: Socket) {
        const instance: InstanceGameInterface | undefined = RegisteryModel.instance[socket.id]

        if (!instance) throw new NotFoundInstanceGameError

        let found: boolean = false

        for (let i = 0; i < instance.games.length; i++) {
            if (instance.games[i].gameId === game.gameId) {
                if (game.isFinished) {
                    delete instance.games[i]
                } else {
                    instance.games[i] = game
                }

                found = true

                break
            }
        }

        if (!found && !game.isFinished) instance.games.push(game)

        LogUtil.logger(TypeLogEnum.REGISTERY).trace('A game updated')

        return ListGamesInstanceGameHelper.getAll()
    }

    @OnMessage()
    @EmitOnSuccess()
    get() {
        return ListGamesInstanceGameHelper.getAll()
    }

    @OnMessage()
    @EmitOnSuccess()
    @EmitOnFail()
    async create() {
        let minId!: string,
            min!: number

        for (let [key, instance] of RegisteryModel.instance) {
            if (min === undefined || instance.games.length < min) {
                min = instance.games.length
                minId = key
            }
        }

        if (minId !== undefined) {
            const creationCode: string = v4()

            LogUtil.logger(TypeLogEnum.REGISTERY).info(`Wait for creation of game with code: "${creationCode}"`)

            const gameId: string = await CreationConnectionGameHelper.waitRes(RegisteryModel.instance[minId].socket, creationCode)

            LogUtil.logger(TypeLogEnum.REGISTERY).trace('A new game created')

            return gameId
        } else {
            LogUtil.logger(TypeLogEnum.REGISTERY).warn('No game instance registered')

            throw new NoAvailableInstanceGameError
        }
    }
}