import { EventEmitter } from '@angular/core'

import { SubTabTabDetailedListInteractiveSharedModel } from '../sub-tab/model/sub-tab.tab.detailed.list.interactive.shared.model'

export class TabDetailedListInteractiveSharedModel {
  private _title: string = ''
  private _visibility: boolean = false
  private _subTabList: Array<SubTabTabDetailedListInteractiveSharedModel> = new Array
  private _visibilityEvent!: EventEmitter<string>

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
    this._subTabList.push(value)

    return this
  }
}
