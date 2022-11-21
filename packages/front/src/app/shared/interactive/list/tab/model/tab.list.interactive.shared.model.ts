import { ItemTabListInteractiveSharedModel } from "../item/model/item.tab.list.interactive.shared.model"


export class TabListInteractiveSharedModel {
    private _title: string = ''
    private _visibility: boolean = false
    private _itemList: Array<ItemTabListInteractiveSharedModel> = new Array()

    public setTitle(value: string): this {
        this._title = value

        return this
    }

    public setVisibility(value: boolean): this {
        this._visibility = value

        return this
    }

    public get title(): string {
        return this._title
    }

    public get visibility(): boolean {
        return this._visibility
    }

    public get itemList(): Array<ItemTabListInteractiveSharedModel> {
        return this._itemList
    }

    public addItem(value: ItemTabListInteractiveSharedModel): this {
        this._itemList.push(value)

        return this
    }
}
