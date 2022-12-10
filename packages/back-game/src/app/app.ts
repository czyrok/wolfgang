import http from 'http'
import { connect } from 'mongoose'
import { Server } from 'socket.io'
import { SocketIoController } from 'ts-socket.io-controller'


async function run() {
    await connect("mongodb://localhost:60017/wolfgang", {
        authSource: "admin",
        user: "admin",
        pass: "pass"
    })

    const server: http.Server = http.createServer()
    const io = new Server(server)

    server.listen(5501)

    SocketIoController.useSocketIoServer(io, {
        controllers: [],
        middlewares: [],
        useClassTransformer: true
    })
}

run().catch((error: Error) => {
    throw error
})