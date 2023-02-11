import { EventEmitter } from '@angular/core'
import { Subject } from 'rxjs'

import { TabDetailedListInteractiveSharedModel } from '../tab/model/tab.detailed.list.interactive.shared.model'
import { ItemSubTabTabDetailedListInteractiveSharedModel } from '../tab/sub-tab/item/model/item.sub-tab.tab.detailed.list.interactive.shared.model'

export class DetailedListInteractiveSharedModel {
    private _tabList: Array<TabDetailedListInteractiveSharedModel> = new Array
    private _visibilityEvent: EventEmitter<string> = new EventEmitter
    private _clickedItemEvent: Subject<ItemSubTabTabDetailedListInteractiveSharedModel<any>> = new Subject
    private _selectedItems: Array<ItemSubTabTabDetailedListInteractiveSharedModel<any>> = new Array

    private set selectedItems(itemsList: Array<ItemSubTabTabDetailedListInteractiveSharedModel<any>>) {
        this._selectedItems = itemsList
    }

    public constructor() {
        this._clickedItemEvent.subscribe((item: ItemSubTabTabDetailedListInteractiveSharedModel<any>) => {
            let tab!: TabDetailedListInteractiveSharedModel
            let itemTmp!: ItemSubTabTabDetailedListInteractiveSharedModel<any>
            for (const oneTab of this.tabList) {
                if (oneTab.has(item)) {
                    tab = oneTab
                    break
                }
            }

            for (const oneItem of this.selectedItems) {
                if (tab.has(oneItem)) {
                    itemTmp = oneItem
                    break
                }
            }
            this.selectedItems = this.selectedItems.filter((items: ItemSubTabTabDetailedListInteractiveSharedModel<any>) => items !== itemTmp)
            
            this.selectedItems.push(item)
        })
    }

    public get clickedItemEvent(): Subject<ItemSubTabTabDetailedListInteractiveSharedModel<any>> {
        return this._clickedItemEvent
    }

    public get tabList(): Array<TabDetailedListInteractiveSharedModel> {
        return this._tabList
    }

    public get visibilityEvent(): EventEmitter<string> {
        return this._visibilityEvent
    }

    public get selectedItems(): Array<ItemSubTabTabDetailedListInteractiveSharedModel<any>> {
        return this._selectedItems
    }

    public addTab(value: TabDetailedListInteractiveSharedModel): this {
        value.setClickedItemEvent(this.clickedItemEvent)
        
        this._tabList.push(value)

        value.visibilityEvent = this.visibilityEvent

        return this
    }
}
