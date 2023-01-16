import { connect } from 'mongoose'
import { Server } from 'socket.io'
import { SocketIoController } from 'ts-socket.io-controller'
import { LogUtil, LogHelper, ScopeIoMiddleware, AdminScopeIoMiddleware, ConfigAppHelper, TypeLogEnum, EnvUtil, VarEnvEnum, TestScopeIoMiddleware } from 'common'

import { AuthTestController } from './test/auth/controller/auth.test.controller'
import { LogInHomeController } from './home/log-in/controller/log-in.home.controller'
import { SignUpHomeController } from './home/sign-up/controller/sign-up.home.controller'
import { CurrentlyGameController } from './game/currently/controller/currently.game.controller'
import { CardsProposalGameController } from './game/cards-proposal/controller/cards-proposal.game.controller'
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

    const io: Server = ConfigAppHelper.setup({
        port: parseInt(EnvUtil.get(VarEnvEnum.MAIN_PORT)),
        session: true
    })

    SocketIoController.useSocketIoServer(io, {
        controllers: [
            AuthTestController,
            LogInHomeController,
            SignUpHomeController,
            CurrentlyGameController,
            SkinCustomizationProfileGameController,
            CardsProposalGameController
        ],
        middlewares: [
            TestScopeIoMiddleware,
            ScopeIoMiddleware,
            AdminScopeIoMiddleware
        ],
        useClassTransformer: true
    })

    LogUtil.logger(TypeLogEnum.APP).trace('Socket engine initialized')
}

run().catch((error: Error) => {
    LogUtil.logger(TypeLogEnum.APP).fatal(error.message)
})