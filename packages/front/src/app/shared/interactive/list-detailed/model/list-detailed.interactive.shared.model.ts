import { TabListDetailedInteractiveSharedModel } from "../tab/model/tab.list-detailed.interactive.shared.model";

export class ListDetailedInteractiveSharedModel {
    private _tabList: Array<TabListDetailedInteractiveSharedModel> = new Array()

    public get tabList(): Array<TabListDetailedInteractiveSharedModel> {
        return this._tabList
    }

    public addTab(value: TabListDetailedInteractiveSharedModel): this {
        this._tabList.push(value)

        return this
    }
}
