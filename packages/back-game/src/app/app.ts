import http from 'http'
import { connect } from 'mongoose'
import { Server } from 'socket.io'
import { SocketIoController } from 'ts-socket.io-controller'
import { config } from 'dotenv'
import { LogUtil, LogHelper, TypeLogEnum, EnvUtil, VarEnvEnum } from 'common'

import { GameController } from './game/controller/game.controller'
/* import { ChatGameController } from './game/chat/controller/chat.game.controller'
import { VotePlayerGameController } from './game/player/vote/controller/vote.player.game.controller' */

async function run(): Promise<void> {
    LogUtil.config = LogHelper.getConfig(
        TypeLogEnum.APP,
        TypeLogEnum.GAME,
        TypeLogEnum.LOG_IN,
        TypeLogEnum.ACCESS
    )

    LogUtil.logger(TypeLogEnum.APP).trace('App started')

    await connect('mongodb://localhost:60017/wolfgang', {
        authSource: 'admin',
        user: 'admin',
        pass: 'pass'
    })

    LogUtil.logger(TypeLogEnum.APP).trace('Database connection initialized')

    const server: http.Server = http.createServer()
    const io = new Server(server)

    server.listen(EnvUtil.get(VarEnvEnum.GAME_PORT))

    LogUtil.logger(TypeLogEnum.APP).info(`HTTP server listen on port ${EnvUtil.get(VarEnvEnum.GAME_PORT)}`)

    SocketIoController.useSocketIoServer(io, {
        controllers: [
            GameController,
            /* ChatGameController,
            VotePlayerGameController */
        ],
        middlewares: [],
        useClassTransformer: true
    })

    LogUtil.logger(TypeLogEnum.APP).trace('Socket engine initialized')
}

run().catch((error: Error) => {
    LogUtil.logger(TypeLogEnum.APP).fatal(error.message)
})