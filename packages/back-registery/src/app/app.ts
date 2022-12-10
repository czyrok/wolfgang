import http from 'http'
import { Server } from 'socket.io'
import { SocketIoController } from 'ts-socket.io-controller'

import { RegisteryController } from './registery/controller/registery.controller'

async function run() {
    const server: http.Server = http.createServer()
    const io = new Server(server)

    server.listen(4202)

    SocketIoController.useSocketIoServer(io, {
        controllers: [
            RegisteryController
        ],
        middlewares: [],
        useClassTransformer: true
    })
}

run().catch((error: Error) => {
    throw error
}) 