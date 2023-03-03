import { EventEmitter } from '@angular/core'
import { Subject } from 'rxjs'
import { ItemSubTabTabDetailedListInteractiveSharedModel } from '../sub-tab/item/model/item.sub-tab.tab.detailed.list.interactive.shared.model'

import { SubTabTabDetailedListInteractiveSharedModel } from '../sub-tab/model/sub-tab.tab.detailed.list.interactive.shared.model'

/**
 * @classdesc Gère les models des tableaux de listes interactives détaillées
 */
export class TabDetailedListInteractiveSharedModel {
  private _title: string = ''
  private _visibility: boolean = false
  private _subTabList: Array<SubTabTabDetailedListInteractiveSharedModel> = new Array
  private _visibilityEvent!: EventEmitter<string>
  private _clickedItemEvent!: Subject<ItemSubTabTabDetailedListInteractiveSharedModel<any>>

  /**
   * @returns Renvoie le titre
   */
  public get title(): string {
    return this._title
  }

  /**
   * @returns Renvoie l'état de la visibilité
   */
  public get visibility(): boolean {
    return this._visibility
  }

  /**
   * @returns Renvoie une sous-table de listes interactives détaillées
   */
  public get subTabList(): Array<SubTabTabDetailedListInteractiveSharedModel> {
    return this._subTabList
  }

  /**
   * @returns Renvoie un événement de visibilité
   */
  public get visibilityEvent(): EventEmitter<string> {
    return this._visibilityEvent
  }

  /**
   * @returns Renvoie des événements d'item cliqué
   */
  public get clickedItemEvent(): Subject<ItemSubTabTabDetailedListInteractiveSharedModel<any>> {
    return this._clickedItemEvent
  }

  /**
   * Modifie la visibilité en fonction du titre
   */
  public set visibilityEvent(value: EventEmitter<string>) {
    this._visibilityEvent = value

    this._visibilityEvent.subscribe((value: string) => {
      if (this.title === value) {
        this.setVisibility(true)
      } else {
        this.setVisibility(false)
      }
    })
  }

  /**
   * Modifie le titre
   * @param value Nouveau titre
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
   * Ajout une sous-table
   * @param value La sous-table a rajouter
   * @returns Le model
   */
  public addSubTab(value: SubTabTabDetailedListInteractiveSharedModel): this {
    if (this.clickedItemEvent) value.setClickedItemEvent(this.clickedItemEvent)

    this._subTabList.push(value)

    return this
  }

  /**
   * Modifie L'événement de l'item cliqué
   * @param item Item sélectionné
   * @returns Le model
   */
  public setClickedItemEvent(item: Subject<ItemSubTabTabDetailedListInteractiveSharedModel<any>>): this {
    this._clickedItemEvent = item

    return this
  }

  /**
   * Permet de vérifier si l'item fait partie de la liste de sous-tables
   * @param item Item sélectionné
   * @returns Vraie si il en fait partie sinon faux
   */
  public has(item: ItemSubTabTabDetailedListInteractiveSharedModel<any>): boolean {
    for (const subTab of this._subTabList) {
      if (subTab.has(item)) return true
    }

    return false
  }
}
