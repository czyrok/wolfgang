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
    let radius: number = Math.min(
      this.elementRef.nativeElement.offsetWidth,
      this.elementRef.nativeElement.offsetHeight) / 2,
      t: number = 2 * Math.PI / this.list.length

    let maxX: number = 0,
      maxY: number = 0

    let map: Map<number, Array<PlaceCircleAvatarPlayGamesMainViewModel>> = new Map()

    for (let i = 0; i < this.list.length; i++) {
      this.list[i].y = (Math.cos(t * i) * radius * 0.8) + radius
      this.list[i].x = (Math.sin(t * i) * radius) + radius

      if (this.list[i].x > maxX) maxX = this.list[i].x
      if (this.list[i].y > maxY) maxY = this.list[i].y

      if (map.has(this.list[i].y)) {
        map.get(this.list[i].y)?.push(this.list[i])
      } else {
        map.set(this.list[i].y, [
          this.list[i]
        ])
      }
    }

    map = map = new Map([...map.entries()].sort((a: [number, Array<PlaceCircleAvatarPlayGamesMainViewModel>], b: [number, Array<PlaceCircleAvatarPlayGamesMainViewModel>]) => {
      if (a[0] < b[0]) {
        return -1
      } else if (a[0] > b[0]) {
        return 1
      } else {
        return 0
      }
    }))

    maxX = this.elementRef.nativeElement.offsetWidth - maxX
    maxY = this.elementRef.nativeElement.offsetHeight - maxY

    let count = 1

    for (let element of map) {
      for (let place of element[1]) {
        place.index = count

        place.x += maxX / 2
        place.y += maxY / 2

        place.update()
      }

      count++
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
