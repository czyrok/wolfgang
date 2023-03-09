import { MetadataManagerSocketModel } from '../../../manager/metadata/model/metadata.manager.socket.model'

export class LinkNamespaceSocketModel<S, R, E = any> {
    private _data?: R

    private _defaultCallback: (data: R) => void = (data: R) => {
        this.data = data
    }

    private _callbackList: Array<(data: R) => void> = new Array
    private _errorCallbackList: Array<(error: E) => void> = new Array

    public constructor(
        private _metadata: MetadataManagerSocketModel,
        private _event: string
    ) {
        this.start()
    }

    public set data(value: R | undefined) {
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

    private get errorCallbackList(): Array<(error: E) => void> {
        return this._errorCallbackList
    }

    public get metadata(): MetadataManagerSocketModel {
        return this._metadata
    }

    public get event(): string {
        return this._event
    }

    private start(): this {
        this.metadata.newUse()

        return this
    }

    public emit(data: S): this {
        this.metadata.socket.emit(this.event, data)

        return this
    }

    public onDefault(): this {
        this.metadata.socket.on(this.event, this.defaultCallback)

        return this
    }

    public on(callback: (data: R) => void): this {
        this.callbackList.push(callback)

        this.metadata.socket.on(this.event, callback)

        return this
    }

    public onFail(callback: (error: E) => void): this {
        this.errorCallbackList.push(callback)

        // #achan le -failed
        this.metadata.socket.on(`${this.event}-failed`, callback)

        return this
    }

    public removeDefault(): this {
        this.metadata.socket.removeListener(this.event, this.defaultCallback)

        return this
    }

    public remove(callback: (data: R) => void): this {
        const index: number = this.callbackList.indexOf(callback)

        if (index > -1) this.callbackList.splice(index, 1)

        this.metadata.socket.removeListener(this.event, callback)

        return this
    }

    public removeFailed(callback: (error: E) => void): this {
        const index: number = this.errorCallbackList.indexOf(callback)

        if (index > -1) this.errorCallbackList.splice(index, 1)

        // #achan le -failed
        this.metadata.socket.removeListener(`${this.event}-failed`, callback)

        return this
    }

    public removeAll(): this {
        for (const callback of this.callbackList) {
            this.metadata.socket.removeListener(this.event, callback)
        }

        for (const callback of this.errorCallbackList) {
            // #achan le -failed
            this.metadata.socket.removeListener(`${this.event}-failed`, callback)
        }

        return this
    }

    public destroy(): this {
        this.removeAll()

        this.metadata.lessUse()

        return this
    }
}