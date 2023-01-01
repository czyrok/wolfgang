import { ChangeDetectorRef, ElementRef, Renderer2, ViewContainerRef, EventEmitter } from '@angular/core'
import { VotePlayerGameModel } from 'common'

import { PlaceCircleAvatarPlayViewModel } from '../place/model/place.circle.avatar.play.view.model'

export class CircleAvatarPlayViewModel {
  private list: Array<PlaceCircleAvatarPlayViewModel> = new Array()

  constructor(
    private voteEventEmitter: EventEmitter<VotePlayerGameModel>,
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

    let map: Map<number, Array<PlaceCircleAvatarPlayViewModel>> = new Map()

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

    map = map = new Map([...map.entries()].sort((a: [number, Array<PlaceCircleAvatarPlayViewModel>], b: [number, Array<PlaceCircleAvatarPlayViewModel>]) => {
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
      this.list.push(PlaceCircleAvatarPlayViewModel.create(this.voteEventEmitter, this.renderer, this.changeDetectorRef, this.viewContainerRef, id))
    }
  }

  public addPlayer(id: string): void {
    this.list.push(PlaceCircleAvatarPlayViewModel.create(this.voteEventEmitter, this.renderer, this.changeDetectorRef, this.viewContainerRef, id))

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
