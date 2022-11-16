import { TabListInteractiveSharedModel } from "../tab/model/tab.list.interactive.shared.model";

export class ListInteractiveSharedModel {
    private _tabList!: Array<TabListInteractiveSharedModel>

    public get tabList(): Array<TabListInteractiveSharedModel> {
        return this._tabList
    }

    public addTab(value: TabListInteractiveSharedModel): this {
        this._tabList.push(value)

        return this
    }
}