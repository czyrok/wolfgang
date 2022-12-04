import http from 'http'
import { Server } from 'socket.io'
import { SocketIoController } from 'ts-socket.io-controller'

import { GamesMainController } from './main/games/controller/games.main.controller'

const server: http.Server = http.createServer()

const io = new Server(server)

server.listen(4201)

SocketIoController.useSocketIoServer(io, {
    controllers: [
        GamesMainController
    ],
    middlewares: [],
    useClassTransformer: true
})