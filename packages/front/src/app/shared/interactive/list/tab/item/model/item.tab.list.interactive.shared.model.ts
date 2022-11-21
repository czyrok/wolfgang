export class ItemTabListInteractiveSharedModel {
    private _name: string = ''
    private _callBack: () => void = () => {}
    private _isDisabled: boolean = true

    public setName(value: string): this {
        this._name = value

        return this
    }

    public setCallBack(value: () => void): this {
        this._callBack = value

        return this
    }

    public setIsDisabled(value: boolean): this {
        this._isDisabled = value

        return this
    }

    public get name(): string {
        return this._name
    }

    public get callBack(): () => void {
        return this._callBack
    }

    public get isDisabled(): boolean {
        return this._isDisabled
    }
}
