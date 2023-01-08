import { ItemTabListInteractiveSharedModel } from "../item/model/item.tab.list.interactive.shared.model"


export class TabListInteractiveSharedModel {
  private _title: string = ''
  private _visibility: boolean = false
  private _isIconOnly: boolean = false
  private _itemList: Array<ItemTabListInteractiveSharedModel> = new Array

  public get title(): string {
    return this._title
  }

  public get visibility(): boolean {
    return this._visibility
  }

  public get isIconOnly(): boolean {
    return this._isIconOnly
  }

  public get itemList(): Array<ItemTabListInteractiveSharedModel> {
    return this._itemList
  }

  public setTitle(value: string): this {
    this._title = value

    return this
  }

  public setVisibility(value: boolean): this {
    this._visibility = value

    return this
  }

  public setIsIconOnly(value: boolean): this {
    this._isIconOnly = value

    return this
  }

  public addItem(value: ItemTabListInteractiveSharedModel): this {
    this._itemList.push(value)

    return this
  }
}
