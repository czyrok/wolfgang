import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener, Input, Renderer2, ViewChild, ViewContainerRef } from '@angular/core'
import { StateGameModel, VotePlayerGameModel } from 'common'

import { CircleAvatarPlayViewModel } from '../model/circle.avatar.play.view.model'

@Component({
  selector: 'app-view-play-avatar-circle',
  templateUrl: './circle.avatar.play.view.component.html',
  styleUrls: ['./circle.avatar.play.view.component.scss']
})
export class CircleAvatarPlayViewComponent implements AfterViewInit {
  avatarsCircle!: CircleAvatarPlayViewModel

  first: boolean = true

  constructor(
    private renderer: Renderer2,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngAfterViewInit(): void {
    this.avatarsCircle = new CircleAvatarPlayViewModel(this.eventPlayerVote, this.renderer, this.changeDetectorRef, this.targetRef, this.boxContainerRef)

    if (this.gameStateEvent !== undefined) this.gameStateEvent.subscribe((data: StateGameModel) => {
      if (data.isStarted && this.first) {
        this.avatarsCircle.removeAll()

        this.avatarsCircle.setPlayers(data.players)

        this.avatarsCircle.update()
        this.avatarsCircle.update()

        this.first = false
      }

      if (!data.isStarted) {
        this.avatarsCircle.removeAll()

        this.avatarsCircle.setPlayers(data.players)

        this.avatarsCircle.update()
        this.avatarsCircle.update()
      }
    })
  }

  @Input() eventPlayerVote!: EventEmitter<VotePlayerGameModel>
  @Input() gameStateEvent!: EventEmitter<StateGameModel>

  @ViewChild('target', { read: ViewContainerRef }) targetRef!: ViewContainerRef
  @ViewChild('widthTarget') boxContainerRef!: ElementRef<HTMLElement>

  @HostListener('window:resize') resize(): void {
    this.avatarsCircle.update()
  }
}

