import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener, Input, Renderer2, ViewChild, ViewContainerRef } from '@angular/core'
import { PlayerGameModel, StateGameModel, VotePlayerGameModel } from 'common'

import { CircleAvatarPlayViewModel } from '../model/circle.avatar.play.view.model'

@Component({
  selector: 'app-view-play-avatar-circle',
  templateUrl: './circle.avatar.play.view.component.html',
  styleUrls: ['./circle.avatar.play.view.component.scss']
})
export class CircleAvatarPlayViewComponent implements AfterViewInit {
  avatarsCircle!: CircleAvatarPlayViewModel

  constructor(
    private renderer: Renderer2,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngAfterViewInit(): void {
    this.avatarsCircle = new CircleAvatarPlayViewModel(this.eventPlayerVote, this.renderer, this.changeDetectorRef, this.viewContainerRefTarget, this.elementRefTarget)

    if (this.eventGameState !== undefined) this.eventGameState.subscribe((data: StateGameModel) => {
      this.avatarsCircle.setPlayers((data as any)._players.map((player: PlayerGameModel) => player.userId))
      this.avatarsCircle.update()
    })
  }

  @Input() eventPlayerVote!: EventEmitter<VotePlayerGameModel>
  @Input() eventGameState!: EventEmitter<StateGameModel>

  @ViewChild('target', { read: ViewContainerRef }) viewContainerRefTarget!: ViewContainerRef
  @ViewChild('widthTarget') elementRefTarget!: ElementRef<HTMLElement>

  @HostListener('window:resize') resize(): void {
    this.avatarsCircle.update()
  }
}

