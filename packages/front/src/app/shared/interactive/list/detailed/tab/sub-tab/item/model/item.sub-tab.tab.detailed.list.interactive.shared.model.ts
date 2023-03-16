import { Subject } from "rxjs"

/**
 * @classdesc Gère les mdels d'items de sous-tables des tableaux de listes interactives détaillées
 */
export class ItemSubTabTabDetailedListInteractiveSharedModel<T> {
  private _name: string = ''
  private _callBack: () => void = () => { }
  private _isDisabled: boolean = true
  private _imgURL!: string
  private _count: number = -1
  private _clickedItemEvent!: Subject<ItemSubTabTabDetailedListInteractiveSharedModel<T>>
  private _isSelected!: boolean
  private _associedObject!: T

  /**
   * @returns Renvois le nom de l'item
   */
  public get name(): string {
    return this._name
  }

  /**
   * @returns Renvois un callBack sur le model
   */
  public get callBack(): () => void {
    return this._callBack
  }

  /**
   * @returns Renvois vrai s'il est désactivé sinon faux
   */
  public get isDisabled(): boolean {
    return this._isDisabled
  }

  /**
   * @returns Renvois l'url d'une image
   */
  public get imgURL(): string {
    return this._imgURL
  }

  /**
   * @returns Renvois un compteur
   */
  public get count(): number {
    return this._count
  }

  /**
   * @returns Renvois l'événement d'un item cliqué
   */
  public get clickedItemEvent(): Subject<ItemSubTabTabDetailedListInteractiveSharedModel<T>> {
    return this._clickedItemEvent
  }

  /**
   * @returns Renvois vrai l'item est sélectionné sinon faux
   */
  public get isSelected(): boolean {
    return this._isSelected
  }

  /**
   * @returns Renvois un objet associé
   */
  public get associedObject(): T {
    return this._associedObject
  }

  /**
   * Permet de définir le nom
   * @param value Nouveau nom
   * @returns Le model
   */
  public setName(value: string): this {
    this._name = value

    return this
  }

  /**
   * Permet de créer un callBack
   * @returns Le model
   */
  public setCallBack(value: () => void): this {
    this._callBack = value

    return this
  }

  /**
   * Permet de modifier l'état de la désactivation
   * @param value Nouvelle valeur de l'état
   * @returns Le model
   */
  public setIsDisabled(value: boolean): this {
    this._isDisabled = value

    return this
  }

  /**
   * Permet d'assigner une URL à une image
   * @param value Valeur de l'URL
   * @returns Le model
   */
  public setImgURL(value: string): this {
    this._imgURL = value

    return this
  }

  /**
   * Permet de modifier le compteur
   * @param value Nouvelle valeur du compteur
   * @returns Le model
   */
  public setCount(value: number): this {
    this._count = value

    return this
  }

  /**
   * Permet de modifier l'item selectionné
   * @param item Nouvelle item
   * @returns Le model
   */
  public setClickedItemEvent(item: Subject<ItemSubTabTabDetailedListInteractiveSharedModel<T>>): this {
    this._clickedItemEvent = item

    return this
  }

  /**
   * Permet de modifier l'état de la sélection
   * @param value Nouvelle état
   * @returns Le model
   */
  public setIsSelected(value: boolean): this {
    this._isSelected = value

    return this
  }

  /**
   * Permet d'associer un objet
   * @param value L'objet à associer
   * @returns Le model
   */
  public setAssociedObject(value: T) {
    this._associedObject = value

    return this
  }

  public click(): void {
    if (this._clickedItemEvent !== undefined) this._clickedItemEvent.next(this)
  }
}
