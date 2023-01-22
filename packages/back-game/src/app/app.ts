import { setupMaster, fork, isMaster, workers } from 'cluster'
import { join, dirname } from 'path'
import { instanceToPlain, plainToInstance } from 'class-transformer'
import { EnvUtil, VarEnvEnum, HandlerSocketLinkModel, ReceiverLinkSocketModel, SenderLinkSocketModel, LogUtil, LogHelper, TypeLogEnum, GameModel } from 'common'

if (isMaster) {
    LogUtil.config = LogHelper.getConfig(
        TypeLogEnum.APP,
        TypeLogEnum.GAME,
        TypeLogEnum.LOG_IN,
        TypeLogEnum.ACCESS
    )

    LogUtil.logger(TypeLogEnum.APP).trace('App started')

    const ioHandler: HandlerSocketLinkModel
        = new HandlerSocketLinkModel(EnvUtil.get(VarEnvEnum.REGISTERY_URL), parseInt(EnvUtil.get(VarEnvEnum.REGISTERY_PORT)))

    const createLink: ReceiverLinkSocketModel<string> = ioHandler.registerReceiver('/registery', 'create'),
        triggerLink: SenderLinkSocketModel<void> = ioHandler.registerSender('/registery', 'trigger')

    const updateLink: SenderLinkSocketModel<GameModel> = ioHandler.registerSender('/registery', 'update')

    const readyLink: SenderLinkSocketModel<GameModel> = ioHandler.registerSender('/registery', 'ready')

    setupMaster({
        exec: join(dirname(__filename), 'worker.js'),
        args: ['--use', 'http'],
        silent: true,
    })

    createLink.subscribe((creationCode: string) => {
        const worker = fork({
            CREATION_CODE: creationCode
        })

        let first: boolean = true

        worker.on('message', (msg: any) => {
            const game: GameModel = plainToInstance(GameModel, msg)

            if (game.id) {
                const obj: any = instanceToPlain(game)

                if (first) readyLink.emit(obj)

                updateLink.emit(obj)

                first = false
            }
        })
    })

    let first: boolean = true

    ioHandler.socketManager.on('open', () => {
        triggerLink.emit()

        LogUtil.logger(TypeLogEnum.APP).trace('App connected to registery')

        if (!first) {
            for (const id in workers) {
                const worker = workers[id]

                if (worker) worker.send({ cmd: 'getGameData' })
            }

            LogUtil.logger(TypeLogEnum.APP).trace('Games data refreshed')
        }

        first = false
    })

    ioHandler.socketManager.on('close', () => {
        LogUtil.logger(TypeLogEnum.APP).warn('App disconnected from registery')
    })

    ioHandler.socketManager.connect()
}