//import { Worker, isMainThread } from 'worker_threads'
import { setupMaster, fork, isMaster } from 'cluster'
import { join, dirname } from 'path'
import { EnvUtil, VarEnvEnum, HandlerSocketLinkModel, ReceiverLinkSocketModel, SenderLinkSocketModel, LogUtil, LogHelper, TypeLogEnum } from 'common'

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

    setupMaster({
        exec: join(dirname(__filename), 'worker.js'),
        args: ['--use', 'http'],
        silent: true,
    });

    createLink.subscribe((id: string) => {
        fork({
            ID: id
        })
        /* const worker = new Worker(join(dirname(__filename), 'worker.js'), {
            workerData: id
        }) */
    })

    triggerLink.emit()
}