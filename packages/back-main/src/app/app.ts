import { connect } from 'mongoose'
import { Server } from 'socket.io'
import { SocketIoController } from 'ts-socket.io-controller'
import { LogUtil, LogHelper, SessionIoMiddleware, ScopeIoMiddleware, AdminScopeIoMiddleware, ConfigAppHelper, TypeLogEnum, EnvUtil, VarEnvEnum, TestScopeIoMiddleware } from 'common'

import { AuthController } from './auth/controller/auth.controller'
import { LogInHomeController } from './home/log-in/controller/log-in.home.controller'
import { SignUpHomeController } from './home/sign-up/controller/sign-up.home.controller'
import { CurrentlyGameController } from './game/currently/controller/currently.game.controller'
import { CardsProposalGameController } from './game/cards-proposal/controller/cards-proposal.game.controller'
import { ProfileGameController } from './game/profile/controller/profile.game.controller'
import { SkinCustomizationProfileGameController } from './game/profile/skin-customization/controller/skin-customization.profile.game.controller'
import { ReportManagingController } from './managing/report/controller/report.managing.controller'
import { GameController } from './game/controller/game.controller'

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
        cors: {
            // #achan
            origin: 'http://localhost:4200',
            credentials: true
        },
        session: true
    })

    SocketIoController.useSocketIoServer(io, {
        controllers: [
            AuthController,
            LogInHomeController,
            SignUpHomeController,
            CurrentlyGameController,
            ProfileGameController,
            SkinCustomizationProfileGameController,
            CardsProposalGameController,
            ReportManagingController,
            GameController
        ],
        middlewares: [
            SessionIoMiddleware,
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