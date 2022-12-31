import { SubTabTabListDetailedInteractiveSharedModel } from '../sub-tab/model/sub-tab.tab.list-detailed.interactive.shared.model'


export class TabListDetailedInteractiveSharedModel {
  private _title: string = ''
  private _visibility: boolean = false
  private _isIconOnly: boolean = false
  private _subTabList: Array<SubTabTabListDetailedInteractiveSharedModel> = new Array()

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

  public get subTabList(): Array<SubTabTabListDetailedInteractiveSharedModel> {
    return this._subTabList
  }

  public addItem(value: SubTabTabListDetailedInteractiveSharedModel): this {
    this._subTabList.push(value)

    return this
  }
}
