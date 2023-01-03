import { EventEmitter } from "@angular/core";

import { SubTabTabListDetailedInteractiveSharedModel } from '../sub-tab/model/sub-tab.tab.list-detailed.interactive.shared.model'


export class TabListDetailedInteractiveSharedModel {
  private _title: string = ''
  private _visibility: boolean = false
  private _isIconOnly: boolean = false
  private _subTabList: Array<SubTabTabListDetailedInteractiveSharedModel> = new Array()
  private _visibilityEvent!: EventEmitter<string>

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

  public set visibilityEvent(value: EventEmitter<string>) {
    this._visibilityEvent = value
    this._visibilityEvent.subscribe((value: string) => {
      if (this.title == value) {
        this.setVisibility(true)
      }else {
        this.setVisibility(false)
      }
    })
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

  public get subTabList(): Array<SubTabTabListDetailedInteractiveSharedModel> {
    return this._subTabList
  }

  public addSubTab(value: SubTabTabListDetailedInteractiveSharedModel): this {
    this._subTabList.push(value)

    return this
  }

  public get visibilityEvent(): EventEmitter<string> {
    return this._visibilityEvent
  }
}
