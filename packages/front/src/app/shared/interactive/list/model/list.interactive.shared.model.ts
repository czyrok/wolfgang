import { TabListInteractiveSharedModel } from '../tab/model/tab.list.interactive.shared.model'
/**
 * Gère les models des listes interactives
 */
export class ListInteractiveSharedModel {
    private _tabList: Array<TabListInteractiveSharedModel> = new Array

    /**
     * @returns Renvois une liste de tableau
     */
    public get tabList(): Array<TabListInteractiveSharedModel> {
        return this._tabList
    }

    /**
     * Permet d'ajouter un tableau à la liste de tableau
     * @param value
     * @returns
     */
    public addTab(value: TabListInteractiveSharedModel): this {
        this._tabList.push(value)

        return this
    }
}
