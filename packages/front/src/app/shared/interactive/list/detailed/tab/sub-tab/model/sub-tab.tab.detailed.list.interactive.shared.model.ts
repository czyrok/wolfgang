import { Subject } from 'rxjs'
import { ItemSubTabTabDetailedListInteractiveSharedModel } from '../item/model/item.sub-tab.tab.detailed.list.interactive.shared.model'

/**
 * @classdesc Gère les models des sous-tables des tableaux de listes interactives détaillées
 */
export class SubTabTabDetailedListInteractiveSharedModel {
  private _title: string = ''
  private _isIconOnly: boolean = false
  private _itemList: Array<ItemSubTabTabDetailedListInteractiveSharedModel<any>> = new Array
  private _clickedItemEvent!: Subject<ItemSubTabTabDetailedListInteractiveSharedModel<any>>

  /**
   * @returns Renvoie le titre
   */
  public get title(): string {
    return this._title
  }

  /**
   * @returns Renvoie s'il est affiché en icône uniquement
   */
  public get isIconOnly(): boolean {
    return this._isIconOnly
  }

  /**
   * @returns Renvoie une liste d'item
   */
  public get itemList(): Array<ItemSubTabTabDetailedListInteractiveSharedModel<any>> {
    return this._itemList
  }

  /**
   * @returns Renvoie l'événement d'un item cliqué
   */
  public get clickedItemEvent(): Subject<ItemSubTabTabDetailedListInteractiveSharedModel<any>> {
    return this._clickedItemEvent
  }

  /**
   * Permet de modifier le titre
   * @param value Le nouveau titre
   * @returns Le model
   */
  public setTitle(value: string): this {
    this._title = value

    return this
  }

  /**
   * Permet de modifier si il est en icône uniquement
   * @param value Le nouvelle état
   * @returns Le model
   */
  public setIsIconOnly(value: boolean): this {
    this._isIconOnly = value

    return this
  }

  /**
   * Permet d'ajouter un item à la liste d'items
   * @param value L'item à ajouter
   * @returns Le model
   */
  public addItem(value: ItemSubTabTabDetailedListInteractiveSharedModel<any>): this {
    if (this.clickedItemEvent) value.setClickedItemEvent(this.clickedItemEvent)

    this.itemList.push(value)

    return this
  }

  /**
   * Permet de modifier l'item selectionné
   * @param item Nouvelle item
   * @returns Le model
   */
  public setClickedItemEvent(item: Subject<ItemSubTabTabDetailedListInteractiveSharedModel<any>>): this {
    this._clickedItemEvent = item

    return this
  }

  /**
   * Permet de vérifier si l'item fait partie de la liste d'item
   * @param item Item sélectionné
   * @returns Vraie si il en fait partie sinon faux
   */
  public has(item: ItemSubTabTabDetailedListInteractiveSharedModel<any>): boolean {
    for (const selfItem of this._itemList) {
      if (item === selfItem) return true
    }

    return false
  }
}
