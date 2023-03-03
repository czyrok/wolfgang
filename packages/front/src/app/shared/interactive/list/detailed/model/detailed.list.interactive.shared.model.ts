import { EventEmitter } from '@angular/core'
import { Subject } from 'rxjs'

import { TabDetailedListInteractiveSharedModel } from '../tab/model/tab.detailed.list.interactive.shared.model'
import { ItemSubTabTabDetailedListInteractiveSharedModel } from '../tab/sub-tab/item/model/item.sub-tab.tab.detailed.list.interactive.shared.model'

/**
 * @classdesc Gère les models des listes interactives détaillées
 */
export class DetailedListInteractiveSharedModel {
    private _tabList: Array<TabDetailedListInteractiveSharedModel> = new Array
    private _visibilityEvent: EventEmitter<string> = new EventEmitter
    private _clickedItemEvent: Subject<ItemSubTabTabDetailedListInteractiveSharedModel<any>> = new Subject
    private _selectedItems: Array<ItemSubTabTabDetailedListInteractiveSharedModel<any>> = new Array

    /**
     * Assigne les items sélectionnés
     */
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

    /**
     * @returns Renvoie l'événement d'un item sélectionné
     */
    public get clickedItemEvent(): Subject<ItemSubTabTabDetailedListInteractiveSharedModel<any>> {
        return this._clickedItemEvent
    }

    /**
     * @returns Renvoie un tableau de listes détaillées
     */
    public get tabList(): Array<TabDetailedListInteractiveSharedModel> {
        return this._tabList
    }

    /**
     * @returns Renvoie la visibilité d'un événement
     */
    public get visibilityEvent(): EventEmitter<string> {
        return this._visibilityEvent
    }

    /**
     * @returns Renvoie une liste de sous-tables du tableau de listes détaillées
     */
    public get selectedItems(): Array<ItemSubTabTabDetailedListInteractiveSharedModel<any>> {
        return this._selectedItems
    }

    /**
     * Ajoute un tableau de listes détaillées dans un tableau de sous-tables
     * @param value tableau de listes détaillées à ajouter
     * @returns Renvoie le model
     */
    public addTab(value: TabDetailedListInteractiveSharedModel): this {
        value.setClickedItemEvent(this.clickedItemEvent)

        this._tabList.push(value)

        value.visibilityEvent = this.visibilityEvent

        return this
    }
}
