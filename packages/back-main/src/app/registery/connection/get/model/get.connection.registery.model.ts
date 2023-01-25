import { EnvUtil, GameModel, HandlerSocketLinkModel, LogUtil, ReceiverLinkSocketModel, SenderLinkSocketModel, TypeLogEnum, VarEnvEnum } from 'common'

export class GetConnectionRegisteryModel {
    private static _instance?: GetConnectionRegisteryModel

    private _connection: HandlerSocketLinkModel
        = new HandlerSocketLinkModel(EnvUtil.get(VarEnvEnum.REGISTERY_URL), parseInt(EnvUtil.get(VarEnvEnum.REGISTERY_PORT)))

    private _getLink: ReceiverLinkSocketModel<Array<GameModel>>
        = this.connection.registerReceiver<Array<GameModel>>('/registery', 'get').subscribe()

    private constructor() {
        this.connection.socketManager.on('open', () => {
            LogUtil.logger(TypeLogEnum.APP).trace('App connected to registery')

            this.getLink.data = new Array

            sender.emit()
        })

        this.connection.socketManager.on('close', () => {
            LogUtil.logger(TypeLogEnum.APP).warn('App disconnected from registery')

            this.getLink.data = new Array
        })

        this.connection.socketManager.connect()

        const sender: SenderLinkSocketModel<void> = this.connection.registerSender('/registery', 'get')
    }

    public static get instance(): GetConnectionRegisteryModel {
        if (this._instance === undefined) this._instance = new GetConnectionRegisteryModel

        return this._instance
    }

    private get connection(): HandlerSocketLinkModel {
        return this._connection
    }

    public get getLink(): ReceiverLinkSocketModel<Array<GameModel>> {
        return this._getLink
    }
}