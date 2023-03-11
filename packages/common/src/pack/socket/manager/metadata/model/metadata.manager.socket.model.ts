import { Subject } from 'rxjs'
import { Socket } from 'socket.io-client'

export class MetadataManagerSocketModel {
    private _useNumber: number = 0

    public constructor(
        private _allUseEndingEvent: Subject<MetadataManagerSocketModel>,
        private _socket: Socket,
        private _namespace: string
    ) { }

    private set useNumber(value: number) {
        this._useNumber = value
    }

    public get useNumber(): number {
        return this._useNumber
    }

    public get allUseEndingEvent(): Subject<MetadataManagerSocketModel> {
        return this._allUseEndingEvent
    }

    public get socket(): Socket {
        return this._socket
    }

    public get namespace(): string {
        return this._namespace
    }

    private checkUse(): void {
        if (this.useNumber > 0) return

        this.allUseEndingEvent.next(this)
    }

    public newUse(): void {
        this.useNumber++
    }

    public lessUse(): void {
        this.useNumber--

        this.checkUse()
    }

    public start(): void {
        this.socket.connect()
    }

    public destroy(): void {
        this.socket.disconnect()
    }
}