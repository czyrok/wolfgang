import { EventEmitter } from '@angular/core'
import { Subject } from 'rxjs'
import { ItemSubTabTabDetailedListInteractiveSharedModel } from '../sub-tab/item/model/item.sub-tab.tab.detailed.list.interactive.shared.model'

import { SubTabTabDetailedListInteractiveSharedModel } from '../sub-tab/model/sub-tab.tab.detailed.list.interactive.shared.model'

export class TabDetailedListInteractiveSharedModel {
  private _title: string = ''
  private _visibility: boolean = false
  private _subTabList: Array<SubTabTabDetailedListInteractiveSharedModel> = new Array
  private _visibilityEvent!: EventEmitter<string>
  private _clickedItemEvent!: Subject<ItemSubTabTabDetailedListInteractiveSharedModel<any>>

  public get title(): string {
    return this._title
  }

  public get visibility(): boolean {
    return this._visibility
  }

  public get subTabList(): Array<SubTabTabDetailedListInteractiveSharedModel> {
    return this._subTabList
  }

  public get visibilityEvent(): EventEmitter<string> {
    return this._visibilityEvent
  }

  public get clickedItemEvent(): Subject<ItemSubTabTabDetailedListInteractiveSharedModel<any>> {
    return this._clickedItemEvent
  }

  public set visibilityEvent(value: EventEmitter<string>) {
    this._visibilityEvent = value

    this._visibilityEvent.subscribe((value: string) => {
      if (this.title === value) {
        this.setVisibility(true)
      } else {
        this.setVisibility(false)
      }
    })
  }

  public setTitle(value: string): this {
    this._title = value

    return this
  }

  public setVisibility(value: boolean): this {
    this._visibility = value

    return this
  }

  public addSubTab(value: SubTabTabDetailedListInteractiveSharedModel): this {
    if (this.clickedItemEvent) value.setClickedItemEvent(this.clickedItemEvent)
    
    this._subTabList.push(value)

    return this
  }

  public setClickedItemEvent(item: Subject<ItemSubTabTabDetailedListInteractiveSharedModel<any>>): this {
    this._clickedItemEvent = item

    return this
  }

  public has(item: ItemSubTabTabDetailedListInteractiveSharedModel<any>): boolean {
    for (const subTab of this._subTabList) {
      if (subTab.has(item)) return true
    }

    return false
  }
}
