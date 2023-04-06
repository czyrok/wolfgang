/**
 * Gère les model des tableaux de listes d'items
 */
export class ItemTabListInteractiveSharedModel {
  private _name: string = ''
  private _callBack: () => void = () => { }
  private _isDisabled: boolean = true
  private _imgURL!: string
  private _count: number = -1

  /**
   * @returns Renvois le nom
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
   * @returns Renvois s'il est désactivé
   */
  public get isDisabled(): boolean {
    return this._isDisabled
  }

  /**
   * @returns Renvois l'URL d'une image
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
   * Permet de modifier le nom
   * @param value Le nouveau nom
   * @returns Le model
   */
  public setName(value: string): this {
    this._name = value

    return this
  }

  public setCallBack(value: () => void): this {
    this._callBack = value

    return this
  }

  /**
   * Permet de modifier la désactivation
   * @param value Valeur de la désactivation
   * @returns Le model
   */
  public setIsDisabled(value: boolean): this {
    this._isDisabled = value

    return this
  }

  /**
   * Permet de définir l'URL d'une image
   * @param value L'URL
   * @returns Le model
   */
  public setImgURL(value: string): this {
    this._imgURL = value

    return this
  }

  /**
   * Permet de modifier la valeur du compteur
   * @param value Nouvelle valeur
   * @returns Le model
   */
  public setCount(value: number): this {
    this._count = value

    return this
  }
}
