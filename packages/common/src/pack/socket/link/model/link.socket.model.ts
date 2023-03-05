import { Socket } from 'socket.io-client'

export class LinkSocketModel<S, R, E = any> {
    private _data?: R

    private _defaultCallback: (data: R) => void = (data: R) => {
        this.data = data
    }

    private _callbackList: Array<(data: R) => void> = new Array

    public constructor(
        private _socket: Socket,
        private _event: string
    ) { }

    private set data(value: R | undefined) {
        this._data = value
    }

    public get data(): R | undefined {
        return this._data
    }

    private get defaultCallback(): (data: R) => void {
        return this._defaultCallback
    }

    private get callbackList(): Array<(data: R) => void> {
        return this._callbackList
    }

    public get socket(): Socket {
        return this._socket 
    }

    public get event(): string {
        return this._event
    }

    public emit(data: S): this {
        this.socket.emit(this.event, data)

        return this
    }

    public onDefault(): this {
        this.socket.on(this.event, this.defaultCallback)

        return this
    }

    public on(callback: (data: R) => void): this {
        this.callbackList.push(callback)

        this.socket.on(this.event, callback)

        return this
    }

    public onFail(callback: (data: E) => void): this {
        // #achan le -failed
        this.socket.on(`${this.event}-failed`, callback)

        return this
    }

    public removeDefault(): this {
        this.socket.removeListener(this.event, this.defaultCallback)

        return this
    }

    public remove(callback: (data: R) => void): this {
        const index: number = this.callbackList.indexOf(callback)

        if (index > -1) this.callbackList.splice(index, 1)

        this.socket.removeListener(this.event, callback)

        return this
    }

    public removeFailed(callback: (data: E) => void): this {
        // #achan le -failed
        this.socket.removeListener(`${this.event}-failed`, callback)

        return this
    }

    public destroy(): this {
        for (const callback of this.callbackList) {
            this.socket.removeListener(this.event, callback)
        }

        return this
    }
}