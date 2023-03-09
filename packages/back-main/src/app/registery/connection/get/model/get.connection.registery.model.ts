import { EnvUtil, GameModel, LinkNamespaceSocketModel, LogUtil, ManagerSocketModel, TypeLogEnum, VarEnvEnum } from 'common'

export class GetConnectionRegisteryModel {
    private static _instance?: GetConnectionRegisteryModel

    private _connection: ManagerSocketModel
        = new ManagerSocketModel(EnvUtil.get(VarEnvEnum.REGISTERY_URL), parseInt(EnvUtil.get(VarEnvEnum.REGISTERY_PORT)))

    private _getLink: LinkNamespaceSocketModel<void, Array<GameModel>>
        = this.connection.buildLink<void, Array<GameModel>>('/registery', 'get').onDefault()

    private constructor() {
        this.connection.socketIoManager.on('open', () => {
            LogUtil.logger(TypeLogEnum.APP).trace('App connected to registery')

            this.getLink.data = new Array

            this.getLink.emit()
        })

        this.connection.socketIoManager.on('close', () => {
            LogUtil.logger(TypeLogEnum.APP).warn('App disconnected from registery')

            this.getLink.data = new Array
        })

        this.connection.connect()
    }

    public static get instance(): GetConnectionRegisteryModel {
        if (this._instance === undefined) this._instance = new GetConnectionRegisteryModel

        return this._instance
    }

    private get connection(): ManagerSocketModel {
        return this._connection
    }

    public get getLink(): LinkNamespaceSocketModel<void, Array<GameModel>> {
        return this._getLink
    }
}