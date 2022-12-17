import { Socket } from 'socket.io-client'

import { EventSocketModel } from '../../model/event.socket.model'

export class SenderEventSocketModel<T> extends EventSocketModel<T> {
    constructor(
        event: string,
        private socket: Socket
    ) {
        super(event)
    }

    public emit(message: T): this {
        this.socket.emit(this.event, message)

        return this
    }
}