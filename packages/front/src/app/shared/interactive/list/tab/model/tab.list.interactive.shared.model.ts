import { ItemTabListInteractiveSharedModel } from "../item/model/item.tab.list.interactive.shared.model"

/**
 * Gère les listes de tableaux
 */
export class TabListInteractiveSharedModel {
  private _title: string = ''
  private _visibility: boolean = false
  private _isIconOnly: boolean = false
  private _itemList: Array<ItemTabListInteractiveSharedModel> = new Array

  /**
   * @returns Renvois le titre
   */
  public get title(): string {
    return this._title
  }

  /**
   * @returns Renvois l'état de la visibilité
   */
  public get visibility(): boolean {
    return this._visibility
  }

  /**
   * @returns Renvois s'il est affiché en icône uniquement
   */
  public get isIconOnly(): boolean {
    return this._isIconOnly
  }

  /**
   * @returns Renvois une liste d'item
   */
  public get itemList(): Array<ItemTabListInteractiveSharedModel> {
    return this._itemList
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
   * Modifie la visibilité
   * @param value Etat de la visibilité
   * @returns Le model
   */
  public setVisibility(value: boolean): this {
    this._visibility = value

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
   * Permet l'ajout d'un item
   * @param value L'item à ajouter
   * @returns Le model
   */
  public addItem(value: ItemTabListInteractiveSharedModel): this {
    this._itemList.push(value)

    return this
  }
}
