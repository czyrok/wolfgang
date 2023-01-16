export class LinkSocketModel<T> {
    constructor(
        protected _event: string
    ) { }

    public get event(): string {
        return this._event
    }
}