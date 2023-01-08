import { EventEmitter } from '@angular/core'

import { TabDetailedListInteractiveSharedModel } from '../tab/model/tab.detailed.list.interactive.shared.model'

export class DetailedListInteractiveSharedModel {
    private _tabList: Array<TabDetailedListInteractiveSharedModel> = new Array
    private _visibilityEvent: EventEmitter<string> = new EventEmitter

    public get tabList(): Array<TabDetailedListInteractiveSharedModel> {
        return this._tabList
    }

    public get visibilityEvent(): EventEmitter<string> {
        return this._visibilityEvent
    }

    public addTab(value: TabDetailedListInteractiveSharedModel): this {
        this._tabList.push(value)
        
        value.visibilityEvent = this.visibilityEvent

        return this
    }
}
