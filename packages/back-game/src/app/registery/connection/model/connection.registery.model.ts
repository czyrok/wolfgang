import { EnvUtil, GameModel, HandlerSocketLinkModel, SenderLinkSocketModel, VarEnvEnum } from "common"

export class ConnectionRegisteryModel {
    private static _instance?: ConnectionRegisteryModel

    private _connection: HandlerSocketLinkModel
        = new HandlerSocketLinkModel(EnvUtil.get(VarEnvEnum.REGISTERY_URL), parseInt(EnvUtil.get(VarEnvEnum.REGISTERY_PORT)))

    private _updateLink: SenderLinkSocketModel<GameModel>
        = this.connection.registerSender('/registery', 'update')

    private constructor() { }

    public static get instance(): ConnectionRegisteryModel {
        if (this._instance === undefined) this._instance = new ConnectionRegisteryModel

        return this._instance
    }

    private get connection(): HandlerSocketLinkModel {
        return this._connection
    }

    public get updateLink(): SenderLinkSocketModel<GameModel> {
        return this._updateLink
    }
}