import { ElementRef, Renderer2, ViewContainerRef } from "@angular/core";
import { PlaceCircleAvatarPlayGamesMainViewModel } from "../place/model/place.circle.avatar.play.games.main.view.model";

export class CircleAvatarPlayGamesMainViewModel {
  private list: Array<PlaceCircleAvatarPlayGamesMainViewModel> = new Array()

  constructor(
    private renderer: Renderer2,
    private viewContainerRef: ViewContainerRef,
    private elementRef: ElementRef<HTMLElement>
  ) {
    this.update()
  }

  public update(): void {
    let radius = this.elementRef.nativeElement.offsetWidth

    let t: number = 2 * Math.PI / this.list.length

    for (let i = 0; i < this.list.length; i++) {
      this.list[i].x = Math.cos(t * i) * radius
      this.list[i].y = Math.sin(t * i) * radius

      this.list[i].update()
    }
  }

  public addPlayer(id: string): void {
    this.list.push(PlaceCircleAvatarPlayGamesMainViewModel.create(this.renderer, this.viewContainerRef, id))

    this.update()
  }

  public removePlayer(id: string): void {
    for (let i = 0; i < this.list.length; i++) {
      if (this.list[i].id == id) {
        this.list[i].destroy()
        this.list.splice(i, 1)

        break
      }
    }

    this.update()
  }
}
