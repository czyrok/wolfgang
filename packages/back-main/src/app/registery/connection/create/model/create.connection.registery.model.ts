import { EnvUtil, HandlerSocketLinkModel, ReceiverLinkSocketModel, SenderLinkSocketModel, VarEnvEnum } from 'common'

export class CreateConnectionRegisteryModel {
    private _connection: HandlerSocketLinkModel
        = new HandlerSocketLinkModel(EnvUtil.get(VarEnvEnum.REGISTERY_URL), parseInt(EnvUtil.get(VarEnvEnum.REGISTERY_PORT)))

    private _createSenderLink: SenderLinkSocketModel<void>
        = this.connection.registerSender('/registery', 'create')

    private _createReceiverLink: ReceiverLinkSocketModel<string>
        = this.connection.registerReceiver('/registery', 'create')

    private _createErrorLink: ReceiverLinkSocketModel<any>
        = this.connection.registerReceiver('/registery', 'create-failed')

    private get connection(): HandlerSocketLinkModel {
        return this._connection
    }

    private get createSenderLink(): SenderLinkSocketModel<void> {
        return this._createSenderLink
    }

    private get createReceiverLink(): ReceiverLinkSocketModel<string> {
        return this._createReceiverLink
    }

    private get createErrorLink(): ReceiverLinkSocketModel<any> {
        return this._createErrorLink
    }

    public createGame(): Promise<string> {
        return new Promise((resolve: (value: string) => void, reject: (error: any) => void) => {
            this.createReceiverLink.subscribe((id: string) => {
                resolve(id)
            })

            this.createErrorLink.subscribe((error: any) => {
                reject(error)
            })

            this.createSenderLink.emit()
        })
    }

    public destroy(): void {
        this.createReceiverLink.unsubscribe()
        this.createErrorLink.unsubscribe()
    }
}