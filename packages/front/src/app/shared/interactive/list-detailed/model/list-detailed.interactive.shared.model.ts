
import { EventEmitter } from "@angular/core";
import { TabListDetailedInteractiveSharedModel } from "../tab/model/tab.list-detailed.interactive.shared.model";

export class ListDetailedInteractiveSharedModel {
    private _tabList: Array<TabListDetailedInteractiveSharedModel> = new Array()
    private _visibilityEvent: EventEmitter<string> = new EventEmitter

    public get tabList(): Array<TabListDetailedInteractiveSharedModel> {
        return this._tabList
    }

    public get visibilityEvent(): EventEmitter<string> {
        return this._visibilityEvent
    }

    public addTab(value: TabListDetailedInteractiveSharedModel): this {
        this._tabList.push(value)
        
        value.visibilityEvent = this.visibilityEvent

        return this
    }
}
