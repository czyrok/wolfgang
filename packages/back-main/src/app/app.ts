import http from 'http'
import express from 'express'
import { connect } from 'mongoose'
import { Server } from 'socket.io'
import { SocketIoController } from 'ts-socket.io-controller'
import { LogUtil, LogHelper, LocalPassportHelper, ScopeJWTPassportHelper, TypeLogEnum, EnvUtil, VarEnvEnum, LocalPassportMiddleware, PassportHelper, UserModel, UserModelDocument, SkinUserModelDocument, SkinUserModel } from 'common'

import { LogInHomeController } from './home/log-in/controller/log-in.home.controller'
import { CurrentlyGameController } from './game/currently/controller/currently.game.controller'
import { SkinCustomizationProfileGameController } from './game/profile/skin-customization/controller/skin-customization.profile.game.controller'

async function run(): Promise<void> {
    LogUtil.config = LogHelper.getConfig(
        TypeLogEnum.APP,
        TypeLogEnum.LOG_IN,
        TypeLogEnum.ACCESS
    )

    LogUtil.logger(TypeLogEnum.APP).trace('App started')

    await connect(`mongodb://${EnvUtil.get(VarEnvEnum.DB_URL)}:${EnvUtil.get(VarEnvEnum.DB_PORT)}/wolfgang`, {
        authSource: EnvUtil.get(VarEnvEnum.DB_USER),
        user: EnvUtil.get(VarEnvEnum.DB_USER),
        pass: EnvUtil.get(VarEnvEnum.DB_PW)
    })

    LogUtil.logger(TypeLogEnum.APP).trace('Database connection initialized')

    // #areti
    /*     let test = new UserModelDocument(new UserModel('czyrok', 'lol', '1234'))
        test.save() */

    const app: express.Application = express(),
        server: http.Server = http.createServer(app),
        io = new Server(server)

    PassportHelper.setPassport(io)
    //LocalPassportHelper.setStrategy()
    //ScopeJWTPassportHelper.setStrategy()

    LogUtil.logger(TypeLogEnum.APP).trace('Passport configured')

    server.listen(EnvUtil.get(VarEnvEnum.GAME_PORT))

    LogUtil.logger(TypeLogEnum.APP).info(`HTTP server listen on port ${EnvUtil.get(VarEnvEnum.GAME_PORT)}`)

    SocketIoController.useSocketIoServer(io, {
        controllers: [
            LogInHomeController,
            CurrentlyGameController,
            SkinCustomizationProfileGameController
        ],
        middlewares: [
            LocalPassportMiddleware
        ],
        useClassTransformer: true
    })

    LogUtil.logger(TypeLogEnum.APP).trace('Socket engine initialized')
}

run().catch((error: Error) => {
    LogUtil.logger(TypeLogEnum.APP).fatal(error.message)
})