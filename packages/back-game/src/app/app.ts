import http from 'http'
import { connect } from 'mongoose'
import { Server } from 'socket.io'
import { SocketIoController } from 'ts-socket.io-controller'
import { config } from 'dotenv'
import { LogUtil, LogHelper } from 'common'

import { GameController } from './game/controller/game.controller'

import { TypeLogEnum } from './log/type/enum/type.log.enum'

async function run(): Promise<void> {
    LogUtil.config = LogHelper.getConfig(
        TypeLogEnum.APP,
        TypeLogEnum.GAME,
        TypeLogEnum.LOG_IN,
        TypeLogEnum.ACCESS
    )

    LogUtil.logger(TypeLogEnum.APP).trace('App started')

    config({ path: process.cwd() + '/../../.env' })

    LogUtil.logger(TypeLogEnum.APP).trace(`Env variables recovered`)

    await connect('mongodb://localhost:60017/wolfgang', {
        authSource: 'admin',
        user: 'admin',
        pass: 'pass'
    })

    LogUtil.logger(TypeLogEnum.APP).trace('Database connection initialized')

    const server: http.Server = http.createServer()
    const io = new Server(server)

    server.listen(process.env.GAME_PORT)

    LogUtil.logger(TypeLogEnum.APP).info(`HTTP server listen on port ${process.env.GAME_PORT}`)

    SocketIoController.useSocketIoServer(io, {
        controllers: [
            GameController
        ],
        middlewares: [],
        useClassTransformer: true
    })

    LogUtil.logger(TypeLogEnum.APP).trace('Socket engine initialized')
}

run().catch((error: Error) => {
    LogUtil.logger(TypeLogEnum.APP).error(error.message)
})