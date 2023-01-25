import { EnvUtil, GameModel, HandlerSocketLinkModel, ReceiverLinkSocketModel, SenderLinkSocketModel, VarEnvEnum } from "common"

export class GetConnectionRegisteryModel {
    private static _instance?: GetConnectionRegisteryModel

    private _connection: HandlerSocketLinkModel
        = new HandlerSocketLinkModel(EnvUtil.get(VarEnvEnum.REGISTERY_URL), parseInt(EnvUtil.get(VarEnvEnum.REGISTERY_PORT)))

    private _getLink: ReceiverLinkSocketModel<Array<GameModel>>
        = this.connection.registerReceiver<Array<GameModel>>('/registery', 'get').subscribe()

    private constructor() { }

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