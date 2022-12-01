import { ChangeDetectorRef, ComponentRef, Renderer2, ViewContainerRef } from '@angular/core'

import { AvatarSharedComponent } from 'src/app/shared/avatar/component/avatar.shared.component'

export class PlaceCircleAvatarPlayGamesMainViewModel {
  private _x: number = 0
  private _y: number = 0

  constructor(
    private renderer: Renderer2,
    private componentRef: ComponentRef<AvatarSharedComponent>,
    private _id: string
  ) { }

  public set x(value: number) {
    this._x = value
  }

  public set y(value: number) {
    this._y = value
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

  public get id(): string {
    return this._id
  }

  public update(): void {
    this.renderer.setStyle(this.componentRef.location.nativeElement, 'top', this.y + 'px')
    this.renderer.setStyle(this.componentRef.location.nativeElement, 'left', this.x + 'px')
    this.renderer.setStyle(this.componentRef.location.nativeElement, 'position', 'absolute')
    this.renderer.setStyle(this.componentRef.location.nativeElement, 'transform', 'translate(-50%, -50%)')
  }

  public destroy(): void {
    this.componentRef.destroy()
  }

  public static create(renderer: Renderer2, changeDetectorRef: ChangeDetectorRef, viewContainerRef: ViewContainerRef, id: string): PlaceCircleAvatarPlayGamesMainViewModel {
    let componentRef: ComponentRef<AvatarSharedComponent> = viewContainerRef.createComponent(AvatarSharedComponent)

    componentRef.instance.id = id

    changeDetectorRef.detectChanges()

    return new PlaceCircleAvatarPlayGamesMainViewModel(renderer, componentRef, id)
  }
}