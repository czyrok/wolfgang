import { ChangeDetectorRef, ComponentRef, Renderer2, ViewContainerRef, EventEmitter } from '@angular/core'
import { PlayerGameModel, VotePlayerGameModel } from 'common'

import { AllAvatarUserSharedComponent } from 'src/app/shared/user/avatar/all/component/all.avatar.user.shared.component'

export class PlaceCircleAvatarPlayViewModel {
  private _x: number = 0
  private _y: number = 0
  private _index: number = 0

  public constructor(
    private _player: PlayerGameModel,
    private _renderer: Renderer2,
    private _componentRef: ComponentRef<AllAvatarUserSharedComponent>
  ) { }

  public get index(): number {
    return this._index
  }

  public set index(value: number) {
    this._index = value
  }

  public get x(): number {
    return this._x
  }

  public set x(value: number) {
    this._x = value
  }

  public get y(): number {
    return this._y
  }

  public set y(value: number) {
    this._y = value
  }

  public get player(): PlayerGameModel {
    return this._player
  }

  public get renderer(): Renderer2 {
    return this._renderer
  }

  public get componentRef(): ComponentRef<AllAvatarUserSharedComponent> {
    return this._componentRef
  }

  public update(): void {
    this.renderer.setStyle(this.componentRef.location.nativeElement, 'top', this.y + 'px')
    this.renderer.setStyle(this.componentRef.location.nativeElement, 'left', this.x + 'px')
    this.renderer.setStyle(this.componentRef.location.nativeElement, 'z-index', this.index)
    this.renderer.setStyle(this.componentRef.location.nativeElement, 'position', 'absolute')
    this.renderer.setStyle(this.componentRef.location.nativeElement, 'transform', 'translate(-50%, -50%)')
  }

  public destroy(): void {
    this.componentRef.destroy()
  }

  public static create(
    player: PlayerGameModel,
    voteEventEmitter: EventEmitter<VotePlayerGameModel>,
    renderer: Renderer2, changeDetectorRef: ChangeDetectorRef,
    viewContainerRef: ViewContainerRef
  ): PlaceCircleAvatarPlayViewModel {
    const componentRef: ComponentRef<AllAvatarUserSharedComponent> = viewContainerRef.createComponent(AllAvatarUserSharedComponent)

    componentRef.instance.user = player.user
    componentRef.instance.eventPlayerVote = voteEventEmitter

    changeDetectorRef.detectChanges()

    return new PlaceCircleAvatarPlayViewModel(player, renderer, componentRef)
  }
}
