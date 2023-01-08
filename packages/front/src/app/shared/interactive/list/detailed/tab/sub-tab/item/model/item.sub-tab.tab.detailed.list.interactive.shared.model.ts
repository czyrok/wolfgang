export class ItemSubTabTabDetailedListInteractiveSharedModel {
  private _name: string = ''
  private _callBack: () => void = () => { }
  private _isDisabled: boolean = true
  private _imgURL!: string
  private _count: number = -1

  public get name(): string {
    return this._name
  }

  public get callBack(): () => void {
    return this._callBack
  }

  public get isDisabled(): boolean {
    return this._isDisabled
  }

  public get imgURL(): string {
    return this._imgURL
  }

  public get count(): number {
    return this._count
  }

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

  public setImgURL(value: string): this {
    this._imgURL = value

    return this
  }

  public setCount(value: number): this {
    this._count = value

    return this
  }
}