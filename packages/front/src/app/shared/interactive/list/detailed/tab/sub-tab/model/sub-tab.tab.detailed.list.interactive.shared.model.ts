import { Subject } from 'rxjs'
import { ItemSubTabTabDetailedListInteractiveSharedModel } from '../item/model/item.sub-tab.tab.detailed.list.interactive.shared.model'

export class SubTabTabDetailedListInteractiveSharedModel {
  private _title: string = ''
  private _isIconOnly: boolean = false
  private _itemList: Array<ItemSubTabTabDetailedListInteractiveSharedModel<any>> = new Array
  private _clickedItemEvent!: Subject<ItemSubTabTabDetailedListInteractiveSharedModel<any>>

  public get title(): string {
    return this._title
  }

  public get isIconOnly(): boolean {
    return this._isIconOnly
  }

  public get itemList(): Array<ItemSubTabTabDetailedListInteractiveSharedModel<any>> {
    return this._itemList
  }

  public get clickedItemEvent(): Subject<ItemSubTabTabDetailedListInteractiveSharedModel<any>> {
    return this._clickedItemEvent
  }

  public setTitle(value: string): this {
    this._title = value

    return this
  }

  public setIsIconOnly(value: boolean): this {
    this._isIconOnly = value

    return this
  }

  public addItem(value: ItemSubTabTabDetailedListInteractiveSharedModel<any>): this {
    if (this.clickedItemEvent) value.setClickedItemEvent(this.clickedItemEvent)
    
    this.itemList.push(value)

    return this
  }

  public setClickedItemEvent(item: Subject<ItemSubTabTabDetailedListInteractiveSharedModel<any>>): this {
    this._clickedItemEvent = item

    return this
  }

  public has(item: ItemSubTabTabDetailedListInteractiveSharedModel<any>): boolean {
    for (const selfItem of this._itemList) {
      if (item === selfItem) return true
    }

    return false
  }
}
