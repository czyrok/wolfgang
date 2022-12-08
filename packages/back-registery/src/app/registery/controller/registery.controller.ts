import { Socket } from 'socket.io';
import { ConnectedSocket, EmitOnFail, EmitOnSuccess, MessageBody, OnConnect, OnDisconnect, OnMessage, SkipEmitOnEmptyResult, SocketController, SocketIO } from 'ts-socket.io-controller'
import { GameInterface } from '../../interface/game.interface';
import { RegisterInterface } from '../../interface/register.interface';

let registery: RegisterInterface

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
    update(@MessageBody() data: GameInterface, @ConnectedSocket() socket: Socket) {
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
        let list: Array<GameInterface> = new Array()

        for (let [key, instance] of registery) {
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
            // achanger
            let gameId: string = 'id de la partie'

            registery[minId].games.push({
                id: gameId,
                playerCount: 1
            })

            registery[minId].socket.emit('create', gameId)
        }
    }
}

