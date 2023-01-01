import { ChangeDetectorRef, ComponentRef, Renderer2, ViewContainerRef, EventEmitter } from '@angular/core'
import { VotePlayerGameModel } from 'common'

import { AllAvatarUserSharedComponent } from 'src/app/shared/user/avatar/all/component/all.avatar.user.shared.component'

export class PlaceCircleAvatarPlayViewModel {
  private _x: number = 0
  private _y: number = 0
  private _index: number = 0

  constructor(
    private renderer: Renderer2,
    private componentRef: ComponentRef<AllAvatarUserSharedComponent>,
    private _id: string
  ) { }

  public set x(value: number) {
    this._x = value
  }

  public set y(value: number) {
    this._y = value
  }

  public set index(value: number) {
    this._index = value
  }

  public set id(value: string) {
    this._id = value
  }

  public get x(): number {
    return this._x
  }

  public get y(): number {
    return this._y
  }

  public get index(): number {
    return this._index
  }

  public get id(): string {
    return this._id
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

  public static create(voteEventEmitter: EventEmitter<VotePlayerGameModel>,renderer: Renderer2, changeDetectorRef: ChangeDetectorRef, viewContainerRef: ViewContainerRef, id: string): PlaceCircleAvatarPlayViewModel {
    let componentRef: ComponentRef<AllAvatarUserSharedComponent> = viewContainerRef.createComponent(AllAvatarUserSharedComponent)

    componentRef.instance.id = id
    componentRef.instance.eventPlayerVote = voteEventEmitter

    changeDetectorRef.detectChanges()

    return new PlaceCircleAvatarPlayViewModel(renderer, componentRef, id)
  }
}