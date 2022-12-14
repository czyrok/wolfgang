import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener, Input, Renderer2, ViewChild, ViewContainerRef } from '@angular/core'
import { VotePlayerGameModel } from 'common'
import { ReceiverEventSocketModel } from 'src/app/socket/event/receiver/model/receiver.event.socket.model'
import { EventSocketService } from 'src/app/socket/event/service/event.socket.service'

import { CircleAvatarPlayGamesMainViewModel } from '../model/circle.avatar.play.games.main.view.model'

@Component({
  selector: 'app-view-main-games-play-avatar-circle',
  templateUrl: './circle.avatar.play.games.main.view.component.html',
  styleUrls: ['./circle.avatar.play.games.main.view.component.scss']
})
export class CircleAvatarPlayGamesMainViewComponent implements AfterViewInit {
  avatarsCircle!: CircleAvatarPlayGamesMainViewModel

  eventPlayerVote!: EventEmitter<VotePlayerGameModel>
  socketLinkPlayerVote!: ReceiverEventSocketModel<Array<VotePlayerGameModel>>

  constructor(
    private renderer: Renderer2,
    private changeDetectorRef: ChangeDetectorRef,
    private eventSocketLink: EventSocketService
  ) { }

  ngAfterViewInit(): void {
    this.socketLinkPlayerVote = this.eventSocketLink.registerReceiver<Array<VotePlayerGameModel>>('/game/player/vote', 'get').subscribe({
      callback: (data: Array<VotePlayerGameModel>) => {
        for (let oneData of data) this.eventPlayerVote.emit(oneData)
      }
    })

    this.avatarsCircle = new CircleAvatarPlayGamesMainViewModel(this.eventPlayerVote, this.renderer, this.changeDetectorRef, this.viewContainerRefTarget, this.elementRefTarget)

    this.avatarsCircle.setPlayers([
      'maxime',
      'maxime2',
      'maxime3',
      'maxime3',
      'maxime3',
      'maxime3',
      'maxime3'
    ])

    this.avatarsCircle.update()
    this.avatarsCircle.update()
  }

  @Input() id!: string;

  @ViewChild('target', { read: ViewContainerRef }) viewContainerRefTarget!: ViewContainerRef
  @ViewChild('widthTarget') elementRefTarget!: ElementRef<HTMLElement>

  @HostListener('window:resize') resize(): void {
    this.avatarsCircle.update()
  }
}

