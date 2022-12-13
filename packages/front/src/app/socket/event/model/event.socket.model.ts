export class EventSocketModel<T> {
    constructor(
        protected _event: string
    ) { }

    public get event(): string {
        return this._event
    }
}