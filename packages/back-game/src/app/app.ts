import { setupMaster, fork, isMaster, workers } from 'cluster'
import { join, dirname } from 'path'
import { instanceToPlain, plainToInstance } from 'class-transformer'
import { EnvUtil, VarEnvEnum, LogUtil, LogHelper, TypeLogEnum, GameModel, ManagerSocketModel, LinkNamespaceSocketModel, NamespaceSocketModel } from 'common'

if (isMaster) {
    LogUtil.config = LogHelper.getConfig(
        TypeLogEnum.APP,
        TypeLogEnum.GAME,
        TypeLogEnum.LOG_IN,
        TypeLogEnum.ACCESS
    )

    LogUtil.logger(TypeLogEnum.APP).trace('App started')

    setupMaster({
        exec: join(dirname(__filename), 'worker.js'),
        args: ['--use', 'http'],
        silent: true,
    })

    const registeryManager: ManagerSocketModel
        = new ManagerSocketModel(EnvUtil.get(VarEnvEnum.REGISTERY_URL), parseInt(EnvUtil.get(VarEnvEnum.REGISTERY_PORT)))

    const registeryNamespace: NamespaceSocketModel = registeryManager.buildNamespace('/registery')

    const createLink: LinkNamespaceSocketModel<void, string> = registeryNamespace.buildBaseLink('create'),
        triggerLink: LinkNamespaceSocketModel<void, void> = registeryNamespace.buildBaseLink('trigger'),
        updateLink: LinkNamespaceSocketModel<GameModel, void> = registeryNamespace.buildBaseLink('update'),
        readyLink: LinkNamespaceSocketModel<GameModel, void> = registeryNamespace.buildBaseLink('ready')

    createLink.on((creationCode: string) => {
        const worker = fork({
            CREATION_CODE: creationCode
        })

        let first: boolean = true

        worker.on('message', (msg: any) => {
            const game: GameModel = plainToInstance(GameModel, msg)

            if (game.gameId) {
                const obj: any = instanceToPlain(game)

                if (first) readyLink.emit(obj)

                updateLink.emit(obj)

                first = false
            }
        })

        worker.on('exit', () => {
            LogUtil.logger(TypeLogEnum.APP).info(`Game worker killed "{ creationCode: "${creationCode}" }"`)
        })
    })

    let first: boolean = true

    registeryManager.socketIoManager.on('open', () => {
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

    registeryManager.socketIoManager.on('close', () => {
        LogUtil.logger(TypeLogEnum.APP).warn('App disconnected from registery')
    })

    registeryManager.connect()
}