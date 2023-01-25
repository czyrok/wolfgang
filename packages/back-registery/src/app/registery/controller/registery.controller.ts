import { Socket } from 'socket.io'
import { v4 } from 'uuid'
import { ConnectedSocket, EmitNamespaceBroadcastOnSuccess, EmitOnFail, EmitOnSuccess, MessageBody, OnDisconnect, OnMessage, SkipEmitOnEmptyResult, SocketController } from 'ts-socket.io-controller'
import { GameModel, LogUtil, TypeLogEnum } from 'common'

import { NoAvailableInstanceGameError } from '../../game/instance/error/no-available.instance.game.error'

import { RegisteryModel } from '../model/registery.model'

import { InstanceGameInterface } from '../../game/instance/interface/instance.game.interface'

@SocketController({
    namespace: '/registery',
    init: () => { }
})
export class RegisteryController {
    @OnDisconnect()
    disconnect(@ConnectedSocket() socket: Socket) {
        if (RegisteryModel.instance[socket.id] === undefined) return

        delete RegisteryModel.instance[socket.id]

        LogUtil.logger(TypeLogEnum.REGISTERY).trace('An instance lost')
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
    @SkipEmitOnEmptyResult()
    @EmitNamespaceBroadcastOnSuccess('get')
    update(@MessageBody() game: GameModel, @ConnectedSocket() socket: Socket) {
        const instance: InstanceGameInterface | undefined = RegisteryModel.instance[socket.id]

        if (instance !== undefined) {
            for (let i = 0; i < instance.games.length; i++) {
                if (instance.games[i].id === game.id) {
                    instance.games[i] = game

                    break
                }
            }

            let list: Array<GameModel> = new Array()

            for (let [, instance] of RegisteryModel.instance) {
                list.push(...instance.games)
            }

            return list
        }
    }

    @OnMessage()
    @EmitOnSuccess()
    get() {
        let list: Array<GameModel> = new Array

        for (let [, instance] of RegisteryModel.instance) {
            list.push(...instance.games)
        }

        return list
    }

    @OnMessage()
    @EmitOnSuccess()
    @EmitOnFail()
    create() {
        let minId!: string,
            min!: number

        for (let [key, instance] of RegisteryModel.instance) {
            if (min === undefined || instance.games.length < min) {
                min = instance.games.length
                minId = key
            }
        }

        if (minId !== undefined) {
            const id: string = v4()

            RegisteryModel.instance[minId].socket.emit('create', id)

            LogUtil.logger(TypeLogEnum.REGISTERY).trace('A new game created')

            return id
        } else {
            LogUtil.logger(TypeLogEnum.REGISTERY).warn('No game instance registered')

            throw new NoAvailableInstanceGameError
        }
    }
}