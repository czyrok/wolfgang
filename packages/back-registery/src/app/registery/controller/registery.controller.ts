import { Socket } from 'socket.io'
import { ConnectedSocket, EmitOnSuccess, MessageBody, OnConnect, OnDisconnect, OnMessage, SocketController } from 'ts-socket.io-controller'
import { GameModel, LogUtil, TypeLogEnum } from 'common'

import { RegisteryModel } from '../model/registery.model'

import { InstanceGameInterface } from '../../game/instance/interface/instance.game.interface'

@SocketController({
    namespace: '/registery',
    init: () => { }
})
export class RegisteryController {
    @OnConnect()
    connection(@ConnectedSocket() socket: Socket) {
        if (RegisteryModel.instance[socket.id] === undefined) {
            RegisteryModel.instance[socket.id] = {
                socket: socket,
                games: new Array()
            }
        }

        LogUtil.logger(TypeLogEnum.REGISTERY).trace('A new instance registered')
    }

    @OnDisconnect()
    disconnect(@ConnectedSocket() socket: Socket) {
        delete RegisteryModel.instance[socket.id]

        LogUtil.logger(TypeLogEnum.REGISTERY).trace('An instance lost')
    }

    @OnMessage()
    update(@MessageBody() game: GameModel, @ConnectedSocket() socket: Socket) {
        const instance: InstanceGameInterface | undefined = RegisteryModel.instance[socket.id]

        if (instance !== undefined) {
            let found: boolean = false

            for (let i = 0; i < instance.games.length; i++) {
                if (instance.games[i].id === game.id) {
                    found = true
                
                    instance.games[i] = game

                    break
                }
            }

            if (!found) {
                instance.games.push(game)
            }
        }
    }

    @OnMessage()
    @EmitOnSuccess()
    get() {
        let list: Array<GameModel> = new Array()

        for (let [, instance] of RegisteryModel.instance) {
            list.push(...instance.games)
        }

        return list
    }

    @OnMessage()
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
            RegisteryModel.instance[minId].socket.emit('create')

            LogUtil.logger(TypeLogEnum.REGISTERY).trace('A new game created')
        }
    }
}