import { ChangeDetectorRef, ComponentRef, Renderer2, ViewContainerRef } from '@angular/core'
import { PlayerGameModel } from 'common'

import { AllAvatarUserSharedComponent } from 'src/app/shared/user/avatar/all/component/all.avatar.user.shared.component'

import { EventVoteUserSharedModel } from 'src/app/shared/user/vote/event/model/event.vote.user.shared.model'

/**
 * Modèle du placement d'un joueur dans une partie
 */
export class PlaceCircleAvatarPlayViewModel {
  private _x: number = 0
  private _y: number = 0
  private _index: number = 0

  /**
   * @param _player Le joueur associé
   * @param _renderer Le moteur de rendu d'Angular
   * @param _componentRef Le composant de l'avatar de l'utilisateur
   */
  public constructor(
    private _player: PlayerGameModel,
    private _renderer: Renderer2,
    private _componentRef: ComponentRef<AllAvatarUserSharedComponent>
  ) { }

  /**
   * Revoie son z-index associé au composant de l'avatar
   * @returns Le z-index
   */
  public get index(): number {
    return this._index
  }

  /**
   * Modifie le z-index du composant de l'avatar
   * @param value La nouvelle valeur
   */
  public set index(value: number) {
    this._index = value
  }

  /**
   * @returns Revois les coordonnés en X
   */
  public get x(): number {
    return this._x
  }

  /**
   * Assigne les coordonnés en X
   */
  public set x(value: number) {
    this._x = value
  }

  /**
   * @returns Revois les coordonnés en Y
   */
  public get y(): number {
    return this._y
  }

  /**
   * Assigne les coordonnés en Y
   */
  public set y(value: number) {
    this._y = value
  }

  /**
   * @returns Renvois un utilisateur
   */
  public get player(): PlayerGameModel {
    return this._player
  }

  /**
   * @returns Renvois le rendue personnalisé
   */
  public get renderer(): Renderer2 {
    return this._renderer
  }

  /**
   * @returns Revois la référence d'une liste d'avatars
   */
  public get componentRef(): ComponentRef<AllAvatarUserSharedComponent> {
    return this._componentRef
  }

  /**
   * Met à jour le rendue personnalisé
   */
  public update(): void {
    this.renderer.setStyle(this.componentRef.location.nativeElement, 'top', this.y + 'px')
    this.renderer.setStyle(this.componentRef.location.nativeElement, 'left', this.x + 'px')
    this.renderer.setStyle(this.componentRef.location.nativeElement, 'z-index', this.index)
    this.renderer.setStyle(this.componentRef.location.nativeElement, 'position', 'absolute')
    this.renderer.setStyle(this.componentRef.location.nativeElement, 'transform', 'translate(-50%, -50%)')
  }

  /**
   * Détruit la référence d'une liste d'avatars
   */
  public destroy(): void {
    this.componentRef.destroy()
  }

  /**
   * @param player Un utilsateur
   * @param voteEventEmitter Émetteur d'un événement de vote
   * @param renderer Le rendue personnalisé
   * @param changeDetectorRef Classe de base qui fournit la fonctionnalité de détection des changements
   * @param viewContainerRef Représente un conteneur dans lequel une ou plusieurs vues peuvent être attachées à un composant
   * @returns Renvois le model de placement des avatars en cercle dans une partie
   */
  public static create(
    player: PlayerGameModel,
    voteEvent: EventVoteUserSharedModel,
    renderer: Renderer2, changeDetectorRef: ChangeDetectorRef,
    viewContainerRef: ViewContainerRef
  ): PlaceCircleAvatarPlayViewModel {
    const componentRef: ComponentRef<AllAvatarUserSharedComponent> = viewContainerRef.createComponent(AllAvatarUserSharedComponent)

    componentRef.instance.username = player.user.username
    componentRef.instance.player = player
    
    componentRef.instance.reduced = true
    componentRef.instance.detailed = true
    
    componentRef.instance.voteEvent = voteEvent

    changeDetectorRef.detectChanges()

    return new PlaceCircleAvatarPlayViewModel(player, renderer, componentRef)
  }
}
