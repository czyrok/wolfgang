import { ChangeDetectorRef, ElementRef, Renderer2, ViewContainerRef } from '@angular/core'
import { PlayerGameModel } from 'common'

import { EventVoteUserSharedModel } from 'src/app/shared/user/vote/event/model/event.vote.user.shared.model'
import { PlaceCircleAvatarPlayViewModel } from '../place/model/place.circle.avatar.play.view.model'

/**
 * @classdesc Model de l'fichage des avatars en cercle l'or d'une partie
 */
export class CircleAvatarPlayViewModel {
  private _placesList: Array<PlaceCircleAvatarPlayViewModel> = new Array()

  /**
   * @param _voteEventEmitter Emet un évenement de vote
   * @param _renderer Permet d'implémenter un rendu personnalisé
   * @param _changeDetectorRef Classe de base qui fournit la fonctionnalité de détection des changements
   * @param _targetRef Représente un conteneur dans lequel une ou plusieurs vues peuvent être attachées à un composant
   * @param _boxElementRef Une boite autour d'un élément natif à l'intérieur d'une vue
   */
  public constructor(
    private _voteEvent: EventVoteUserSharedModel,
    private _renderer: Renderer2,
    private _changeDetectorRef: ChangeDetectorRef,
    private _targetRef: ViewContainerRef,
    private _boxElementRef: ElementRef<HTMLElement>
  ) {
    this.update()
  }

  /**
   * @returns Renvois la liste des emplacements des avatars pour l'affichage en cercle
   */
  public get placesList(): Array<PlaceCircleAvatarPlayViewModel> {
    return this._placesList
  }

  /**
   * Renvoie le modèle contenant les évènements de vote
   * @returns Le modèle
   */
  public get voteEvent(): EventVoteUserSharedModel {
    return this._voteEvent
  }

  /**
   * Renvoie le moteur de rendu d'Angular
   * @returns Le moteur de rendu
   */
  public get renderer(): Renderer2 {
    return this._renderer
  }

  /**
   * Renvoie le détecteur de référence d'Angular
   * @returns Le détecteur de référence
   */
  public get changeDetectorRef(): ChangeDetectorRef {
    return this._changeDetectorRef
  }

  /**
   * @returns Renvois un conteneur dans lequel une ou plusieurs vues peuvent être attachées à un composant
   */
  public get targetRef(): ViewContainerRef {
    return this._targetRef
  }

  /**
   * @returns Renvois la boite autour d'un élément natif à l'intérieur d'une vue
   */
  public get boxElementRef(): ElementRef<HTMLElement> {
    return this._boxElementRef
  }

  /**
   * Fonction de mise à jour du cercle en fonction du nombre de joueur
   */
  public update(): void {
    const radius: number = Math.min(
      this.boxElementRef.nativeElement.offsetWidth,
      this.boxElementRef.nativeElement.offsetHeight) / 2.5,
      t: number = 2 * Math.PI / this.placesList.length

    let maxX: number = 0,
      maxY: number = 0

    let map: Map<number, Array<PlaceCircleAvatarPlayViewModel>> = new Map()

    for (let i = 0; i < this.placesList.length; i++) {
      this.placesList[i].y = (Math.cos(t * i) * radius * 0.8) + radius
      this.placesList[i].x = (Math.sin(t * i) * radius) + radius

      if (this.placesList[i].x > maxX) maxX = this.placesList[i].x
      if (this.placesList[i].y > maxY) maxY = this.placesList[i].y

      if (map.has(this.placesList[i].y)) {
        map.get(this.placesList[i].y)?.push(this.placesList[i])
      } else {
        map.set(this.placesList[i].y, [
          this.placesList[i]
        ])
      }
    }

    map = map = new Map([...map.entries()].sort((a: [number, Array<PlaceCircleAvatarPlayViewModel>], b: [number, Array<PlaceCircleAvatarPlayViewModel>]) => {
      if (a[0] < b[0]) {
        return -1
      } else if (a[0] > b[0]) {
        return 1
      } else {
        return 0
      }
    }))

    maxX = this.boxElementRef.nativeElement.offsetWidth - maxX
    maxY = this.boxElementRef.nativeElement.offsetHeight - maxY

    let count = 1

    for (const element of map) {
      for (const place of element[1]) {
        place.index = count

        place.x += maxX / 2
        place.y += maxY / 2

        place.update()
      }

      count++
    }
  }

  /**
   * Assigne une place sur le cercle à chaque utilisateur
   * @param playersList Liste des joueurs dans la partie
   */
  public setPlayers(playersList: Array<PlayerGameModel>) {
    this.placesList.splice(0, this.placesList.length)

    for (const player of playersList) {
      this.placesList.push(PlaceCircleAvatarPlayViewModel.create(player, this.voteEvent, this.renderer, this.changeDetectorRef, this.targetRef))
    }
  }

  /**
   * Ajoute un utilisateur au cercle
   * @param player Un utilisateur
   */
  public addPlayer(player: PlayerGameModel): void {
    this.placesList.push(PlaceCircleAvatarPlayViewModel.create(player, this.voteEvent, this.renderer, this.changeDetectorRef, this.targetRef))
  }

  /**
   * Supprime un utilisateur du cercle
   * @param player Un utlisateur
   */
  public removePlayer(player: PlayerGameModel): void {
    for (let i = 0; i < this.placesList.length; i++) {
      if (this.placesList[i].player.user.id == player.user.id) {
        this.placesList[i].destroy()
        this.placesList.splice(i, 1)

        break
      }
    }
  }

  /**
   * Supprime tous les utilisateurs du cercle
   */
  public removeAll(): void {
    for (const place of this.placesList) {
      place.destroy()
    }

    this.placesList.splice(0, this.placesList.length)
  }
}
