import { LogUtil } from '../../../log/util/log.util'

import { HandlerSocketLinkModel } from '../../../socket/link/handler/model/handler.link.socket.model'

import { TypeLogEnum } from '../../../log/type/enum/type.log.enum'
import { EnvUtil } from '../../../env/util/env.util'
import { VarEnvEnum } from '../../../env/var/enum/var.env.enum'
import { GameModel } from '../../../game/model/game.model'
import { SenderLinkSocketModel } from '../../../socket/link/sender/model/sender.link.socket.model'
import { ReceiverLinkSocketModel } from '../../../socket/link/receiver/model/receiver.link.socket.model'

export class ConnectionRegisteryUtil {
    private static _instance?: ConnectionRegisteryUtil

    private _connection: HandlerSocketLinkModel
        = new HandlerSocketLinkModel(EnvUtil.get(VarEnvEnum.REGISTERY_URL), parseInt(EnvUtil.get(VarEnvEnum.REGISTERY_PORT)))

    private _updateLink: SenderLinkSocketModel<GameModel>
        = this.connection.registerSender<GameModel>('/registery', 'update')
    private _createLink: ReceiverLinkSocketModel<void>
        = this.connection.registerReceiver<void>('/registery', 'create').subscribe(() => {
            // pas au meme endroit les 2
        })

    private constructor() {
        LogUtil.logger(TypeLogEnum.APP).trace('Registery connection initialized')
    }

    public static get instance(): ConnectionRegisteryUtil {
        if (this._instance === undefined) this._instance = new ConnectionRegisteryUtil

        return this._instance
    }

    private get connection(): HandlerSocketLinkModel {
        return this._connection
    }

    public get updateLink(): HandlerSocketLinkModel {
        return this._connection
    }

    public get createLink(): HandlerSocketLinkModel {
        return this._connection
    }
}