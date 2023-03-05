import { Socket, Manager } from 'socket.io-client'

import { LinkSocketModel } from '../../model/link.socket.model'

import { ManagerLinkSocketInterface } from '../interface/manager.link.socket.interface'

export class ManagerLinkSocketModel implements ManagerLinkSocketInterface {
    private _socketManager: Manager

    public constructor(
        url: string,
        port: number
    ) {
        this._socketManager = new Manager(`${url}:${port}`, {
            autoConnect: false,
            transports: ['websocket'],
            withCredentials: true
        })
    }

    public get socketManager(): Manager {
        return this._socketManager
    }

    public register<S, R, E = any>(namespace: string, event: string): LinkSocketModel<S, R, E> {
        const socket: Socket = this.getNamespace(namespace)

        const link: LinkSocketModel<S, R, E> = new LinkSocketModel(socket, event)

        return link
    }

    public getNamespace(namespace: string): Socket {
        return this.socketManager.socket(namespace)
    }
}
