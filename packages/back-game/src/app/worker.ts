import http from 'http'
import { connect } from 'mongoose'
import { Server } from 'socket.io'
import { SocketIoController } from 'ts-socket.io-controller'
import { LogUtil, LogHelper, TypeLogEnum, EnvUtil, VarEnvEnum, GameModel, ScopeIoMiddleware, SessionIoMiddleware } from 'common'

import { GameController } from './game/controller/game.controller'
/* import { ChatGameController } from './game/chat/controller/chat.game.controller'
import { VotePlayerGameController } from './game/player/vote/controller/vote.player.game.controller' */

import { GameMiddleware } from './game/middleware/game.middleware'

import { ConnectionRegisteryModel } from './registery/connection/model/connection.registery.model'

async function run(): Promise<void> {
    LogUtil.config = LogHelper.getConfig(
        TypeLogEnum.APP,
        TypeLogEnum.GAME,
        TypeLogEnum.LOG_IN,
        TypeLogEnum.ACCESS
    )

    LogUtil.logger(TypeLogEnum.APP).trace('New game created')

    await connect(`mongodb://${EnvUtil.get(VarEnvEnum.DB_URL)}:${EnvUtil.get(VarEnvEnum.DB_PORT)}/wolfgang`, {
        authSource: EnvUtil.get(VarEnvEnum.DB_USER),
        user: EnvUtil.get(VarEnvEnum.DB_USER),
        pass: EnvUtil.get(VarEnvEnum.DB_PW)
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
        middlewares: [
            SessionIoMiddleware,
            ScopeIoMiddleware,
            GameMiddleware
        ],
        useClassTransformer: true
    })

    LogUtil.logger(TypeLogEnum.APP).trace('Socket engine initialized')

    const game: GameModel = GameModel.instance

    game.id = process.env['ID'] as string

    game.onStateChange((game: GameModel) => {
        ConnectionRegisteryModel.instance.updateLink.emit(game)
    })

    LogUtil.logger(TypeLogEnum.APP).info(`Game have id: "${game.id}"`)
}

run().catch((error: Error) => {
    LogUtil.logger(TypeLogEnum.APP).fatal(error.message)
})