import { ChangeDetectorRef, ElementRef, Renderer2, ViewContainerRef, EventEmitter } from '@angular/core'
import { PlayerGameModel, VotePlayerGameModel } from 'common'

import { PlaceCircleAvatarPlayViewModel } from '../place/model/place.circle.avatar.play.view.model'

export class CircleAvatarPlayViewModel {
  private _placesList: Array<PlaceCircleAvatarPlayViewModel> = new Array()

  public constructor(
    private _voteEventEmitter: EventEmitter<VotePlayerGameModel>,
    private _renderer: Renderer2,
    private _changeDetectorRef: ChangeDetectorRef,
    private _targetRef: ViewContainerRef,
    private _boxElementRef: ElementRef<HTMLElement>
  ) {
    this.update()
  }

  public get placesList(): Array<PlaceCircleAvatarPlayViewModel> {
    return this._placesList
  }

  public get voteEventEmitter(): EventEmitter<VotePlayerGameModel> {
    return this._voteEventEmitter
  }

  public get renderer(): Renderer2 {
    return this._renderer
  }

  public get changeDetectorRef(): ChangeDetectorRef {
    return this._changeDetectorRef
  }

  public get targetRef(): ViewContainerRef {
    return this._targetRef
  }

  public get boxElementRef(): ElementRef<HTMLElement> {
    return this._boxElementRef
  }

  public update(): void {
    const radius: number = Math.min(
      this.boxElementRef.nativeElement.offsetWidth,
      this.boxElementRef.nativeElement.offsetHeight) / 2,
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

  public setPlayers(playersList: Array<PlayerGameModel>) {
    this.placesList.splice(0, this.placesList.length)

    for (const player of playersList) {
      this.placesList.push(PlaceCircleAvatarPlayViewModel.create(player, this.voteEventEmitter, this.renderer, this.changeDetectorRef, this.targetRef))
    }
  }

  public addPlayer(player: PlayerGameModel): void {
    this.placesList.push(PlaceCircleAvatarPlayViewModel.create(player, this.voteEventEmitter, this.renderer, this.changeDetectorRef, this.targetRef))
  }

  public removePlayer(player: PlayerGameModel): void {
    for (let i = 0; i < this.placesList.length; i++) {
      if (this.placesList[i].player.user.id == player.user.id) {
        this.placesList[i].destroy()
        this.placesList.splice(i, 1)

        break
      }
    }
  }

  public removeAll(): void {
    for (const place of this.placesList) {
      place.destroy()
    }

    this.placesList.splice(0, this.placesList.length)
  }
}
