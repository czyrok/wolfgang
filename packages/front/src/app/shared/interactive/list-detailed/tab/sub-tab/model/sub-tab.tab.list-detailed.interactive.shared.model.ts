import { ItemSubTabTabListDetailedInteractiveSharedModel } from "../item/model/item.sub-tab.tab.list-detailed.interactive.shared.model"


export class SubTabTabListDetailedInteractiveSharedModel {
  private _title: string = ''
  private _visibility: boolean = false
  private _isIconOnly: boolean = false
  private _itemList: Array<ItemSubTabTabListDetailedInteractiveSharedModel> = new Array()

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

  public get title(): string {
    return this._title
  }

  public get visibility(): boolean {
    return this._visibility
  }

  public get isIconOnly(): boolean {
    return this._isIconOnly
  }

  public get itemList(): Array<ItemSubTabTabListDetailedInteractiveSharedModel> {
    return this._itemList
  }

  public addItem(value: ItemSubTabTabListDetailedInteractiveSharedModel): this {
    this._itemList.push(value)

    return this
  }
}
