import { EnvUtil, HandlerSocketLinkModel, ReceiverLinkSocketModel, SenderLinkSocketModel, VarEnvEnum } from 'common'

export class CheckConnectionRegisteryHelper {
    public static async checkGame(gameId: string): Promise<boolean> {
        const handler: HandlerSocketLinkModel = new HandlerSocketLinkModel(EnvUtil.get(VarEnvEnum.REGISTERY_URL), parseInt(EnvUtil.get(VarEnvEnum.REGISTERY_PORT)))

        const checkReceiverLink: ReceiverLinkSocketModel<boolean> = handler.registerReceiver(`/registery`, 'check'),
            chechSenderLink: SenderLinkSocketModel<string> = handler.registerSender(`/registery`, 'check')

        return new Promise((resolve: (value: boolean) => void) => {
            checkReceiverLink.subscribe((test: boolean) => {
                checkReceiverLink.unsubscribe()

                resolve(test)
            })

            handler.socketManager.connect()

            chechSenderLink.emit(gameId)
        })
    }
}