import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener, Input, Renderer2, ViewChild, ViewContainerRef } from '@angular/core'
import { PlayerGameModel, StateGameModel, VotePlayerGameModel } from 'common'

import { CircleAvatarPlayGamesMainViewModel } from '../model/circle.avatar.play.games.main.view.model'

@Component({
  selector: 'app-view-main-games-play-avatar-circle',
  templateUrl: './circle.avatar.play.games.main.view.component.html',
  styleUrls: ['./circle.avatar.play.games.main.view.component.scss']
})
export class CircleAvatarPlayGamesMainViewComponent implements AfterViewInit {
  avatarsCircle!: CircleAvatarPlayGamesMainViewModel

  constructor(
    private renderer: Renderer2,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngAfterViewInit(): void {
    this.avatarsCircle = new CircleAvatarPlayGamesMainViewModel(this.eventPlayerVote, this.renderer, this.changeDetectorRef, this.viewContainerRefTarget, this.elementRefTarget)

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

