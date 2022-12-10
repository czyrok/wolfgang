import { Socket } from 'socket.io';
import { ConnectedSocket, EmitOnFail, EmitOnSuccess, MessageBody, OnConnect, OnDisconnect, OnMessage, SocketController } from 'ts-socket.io-controller'

import { RegisteryModel } from '../model/registery.model'

import { ThreadGameInterface } from '../../game/thread/interface/thread.game.interface'

import uuid from 'uuid'

let registery: RegisteryModel

@SocketController({
    namespace: '/registery',
    init: () => { }
})
export class RegisteryController {
    @OnConnect()
    connection() {
        console.log('client connected');
    }

    @OnDisconnect()
    disconnect() {
        console.log('client disconnected');
    }

    @OnMessage()
    save(@ConnectedSocket() socket: Socket) {
        if (registery[socket.id] === undefined) {
            registery[socket.id] = {
                socket: socket,
                games: new Array()
            }
        }
    }

    @OnMessage()
    update(@MessageBody() data: ThreadGameInterface, @ConnectedSocket() socket: Socket) {
        let instance = registery[socket.id]

        if (instance !== undefined) {
            for (let game of instance.games) {
                if (game.id === data.id) {
                    game.playerCount = data.playerCount
                    break
                }
            }
        }
    }

    @OnMessage()
    @EmitOnSuccess()
    @EmitOnFail()
    get() {
        let list: Array<ThreadGameInterface> = new Array()

        for (let [, instance] of registery) {
            list.push(...instance.games)
        }

        return list
    }

    @OnMessage()
    create() {
        let minId!: string
        let min!: number

        for (let [key, instance] of registery) {
            if (min === undefined) {
                min = instance.games.length
                minId = key
            }
            else {
                if (min > instance.games.length) {
                    min = instance.games.length
                    minId = key
                }
            }
        }

        if (minId !== undefined) {
            let gameId: string = uuid.v4()

            registery[minId].games.push({
                id: gameId,
                playerCount: 1
            })

            // adef
            registery[minId].socket.emit('create', gameId)
        }
    }
}

