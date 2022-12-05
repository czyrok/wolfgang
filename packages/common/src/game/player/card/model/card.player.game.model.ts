export class CardPlayerGameModel {
    private _key!: string

    public constructor(key: string) {
        this._key = key
    }

    public set key(value: string) {
        this._key = value
    }

    public get key(): string {
        return this._key
    }
}