import { Socket } from 'socket.io'
import { v4 } from 'uuid'
import { ConnectedSocket, EmitNamespaceBroadcastOnSuccess, EmitOnFail, EmitOnSuccess, MessageBody, OnDisconnect, OnMessage, SkipEmitOnEmptyResult, SocketController } from 'ts-socket.io-controller'
import { GameModel, LogUtil, TypeLogEnum } from 'common'

import { NoAvailableInstanceGameError } from '../../game/instance/error/no-available.instance.game.error'

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

        const list: Array<GameModel> = new Array

        for (const [, instance] of RegisteryModel.instance) {
            list.push(...instance.games)
        }

        return list
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
    @EmitOnFail()
    @SkipEmitOnEmptyResult()
    @EmitNamespaceBroadcastOnSuccess('get')
    update(@MessageBody() game: GameModel, @ConnectedSocket() socket: Socket) {
        const instance: InstanceGameInterface | undefined = RegisteryModel.instance[socket.id]

        if (instance !== undefined) {
            let found: boolean = false

            for (let i = 0; i < instance.games.length; i++) {
                if (instance.games[i].id === game.id) {
                    instance.games[i] = game

                    found = true

                    break
                }
            }

            if (!found) instance.games.push(game)

            LogUtil.logger(TypeLogEnum.REGISTERY).trace('A game updated')

            const list: Array<GameModel> = new Array()

            for (const [, instance] of RegisteryModel.instance) {
                list.push(...instance.games)
            }

            return list
        }
    }

    @OnMessage()
    @EmitOnSuccess()
    get() {
        const list: Array<GameModel> = new Array

        for (const [, instance] of RegisteryModel.instance) {
            list.push(...instance.games)
        }

        return list
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