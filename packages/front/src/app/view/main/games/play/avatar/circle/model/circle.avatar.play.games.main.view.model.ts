import { ChangeDetectorRef, ElementRef, Renderer2, ViewContainerRef } from "@angular/core";
import { PlaceCircleAvatarPlayGamesMainViewModel } from "../place/model/place.circle.avatar.play.games.main.view.model";

export class CircleAvatarPlayGamesMainViewModel {
  private list: Array<PlaceCircleAvatarPlayGamesMainViewModel> = new Array()

  constructor(
    private renderer: Renderer2,
    private changeDetectorRef: ChangeDetectorRef,
    private viewContainerRef: ViewContainerRef,
    private elementRef: ElementRef<HTMLElement>
  ) {
    this.update()
  }

  public update(): void {
    let radius: number = this.elementRef.nativeElement.offsetWidth / 2

    let t: number = 2 * Math.PI / this.list.length

    for (let i = 0; i < this.list.length; i++) {
      this.list[i].y = (Math.cos(t * i) * radius) + radius
      this.list[i].x = (Math.sin(t * i) * radius) + radius

      this.list[i].update()
    }
  }

  public setPlayers(idList: Array<string>) {
    this.list.splice(0, this.list.length)

    for (let id of idList) {
      this.list.push(PlaceCircleAvatarPlayGamesMainViewModel.create(this.renderer, this.changeDetectorRef, this.viewContainerRef, id))
    }
  }

  public addPlayer(id: string): void {
    this.list.push(PlaceCircleAvatarPlayGamesMainViewModel.create(this.renderer, this.changeDetectorRef, this.viewContainerRef, id))

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
