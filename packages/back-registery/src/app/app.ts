import { Server } from 'socket.io'
import { SocketIoController } from 'ts-socket.io-controller'
import { ConfigAppHelper, EnvUtil, LogHelper, LogUtil, TypeLogEnum, VarEnvEnum } from 'common'

import { RegisteryController } from './registery/controller/registery.controller'

async function run() {
    LogUtil.config = LogHelper.getConfig(
        TypeLogEnum.APP,
        TypeLogEnum.REGISTERY
    )

    LogUtil.logger(TypeLogEnum.APP).trace('App started')

    const io: Server = ConfigAppHelper.setup({
        port: parseInt(EnvUtil.get(VarEnvEnum.REGISTERY_PORT)),
        cors: {}
    })

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