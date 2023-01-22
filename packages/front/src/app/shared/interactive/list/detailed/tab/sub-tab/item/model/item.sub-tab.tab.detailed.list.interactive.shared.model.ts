import { Subject } from "rxjs"

export class ItemSubTabTabDetailedListInteractiveSharedModel<T> {
  private _name: string = ''
  private _callBack: () => void = () => { }
  private _isDisabled: boolean = true
  private _imgURL!: string
  private _count: number = -1
  private _clickedItemEvent!: Subject<ItemSubTabTabDetailedListInteractiveSharedModel<T>>
  private _isSelected!: boolean
  private _associedObject!: T

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

  public get clickedItemEvent(): Subject<ItemSubTabTabDetailedListInteractiveSharedModel<T>> {
    return this._clickedItemEvent
  }

  public get isSelected(): boolean {
    return this._isSelected
  }

  public get associedObject(): T {
    return this._associedObject
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

  public setClickedItemEvent(item: Subject<ItemSubTabTabDetailedListInteractiveSharedModel<T>>): this {
    this._clickedItemEvent = item

    console.log(this, item)

    return this
  }

  public setIsSelected(value: boolean): this {
    this._isSelected = value

    return this
  }

  public setAssociedObject(value: T) {
    this._associedObject = value

    return this
  }

  public click(): void {
    if (this._clickedItemEvent !== undefined) this._clickedItemEvent.next(this)
  }
}