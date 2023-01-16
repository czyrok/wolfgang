import { Socket } from 'socket.io-client'

import { LinkSocketModel } from '../../model/link.socket.model'

export class SenderLinkSocketModel<T> extends LinkSocketModel<T> {
    public constructor(
        event: string,
        private _socket: Socket
    ) {
        super(event)
    }

    public get socket(): Socket {
        return this._socket
    }

    public emit(message: T): this {
        this.socket.emit(this.event, message)

        return this
    }
}