import http from 'http'
import { connect } from 'mongoose'
import { Server } from 'socket.io'
import { SocketIoController } from 'ts-socket.io-controller'

import { GamesMainController } from './main/games/controller/games.main.controller'
import { SkinCustomizationProfileMainController } from './main/profile/skin-customization/controller/skin-customization.profile.main.controller'

async function run() {
    await connect("mongodb://localhost:60017/wolfgang", {
        authSource: "admin",
        user: "admin",
        pass: "pass"
    })

    const server: http.Server = http.createServer()
    const io = new Server(server)

    server.listen(5500)

    SocketIoController.useSocketIoServer(io, {
        controllers: [
            GamesMainController,
            SkinCustomizationProfileMainController
        ],
        middlewares: [],
        useClassTransformer: true
    })
}

run().catch((error: Error) => {
    throw error
}) 