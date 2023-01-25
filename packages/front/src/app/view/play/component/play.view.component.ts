import { AfterViewInit, Component, EventEmitter, OnInit } from '@angular/core'
import { MessageChatGameInterface, ReceiverLinkSocketModel, StateGameModel, VotePlayerGameModel } from 'common'

import { SocketSharedService } from 'src/app/shared/socket/service/socket.shared.service'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-view-play',
  templateUrl: './play.view.component.html',
  styleUrls: ['./play.view.component.scss']
})
export class PlayViewComponent implements AfterViewInit {
  displayChat: boolean = false

  //socketLinkGame: SenderEventSocketModel<string> = this.eventSocketLink.registerSender<string>('/game', 'join')

  eventGameState: EventEmitter<StateGameModel> = new EventEmitter
  stateLink!: ReceiverLinkSocketModel<StateGameModel>

  eventPlayerVote: EventEmitter<VotePlayerGameModel> = new EventEmitter
  //socketLinkPlayerVote!: ReceiverEventSocketModel<Array<VotePlayerGameModel>>

  eventPlayerMessage: EventEmitter<MessageChatGameInterface> = new EventEmitter
  //socketLinkPlayerMessage!: ReceiverEventSocketModel<Array<MessageChatGameInterface>>

  constructor(
    private activatedRoute: ActivatedRoute,
    private socketSharedService: SocketSharedService
  ) {
    /* this.socketLinkGame.emit(this.userService.username)

    this.socketLinkPlayerVote = this.eventSocketLink.registerReceiver<Array<VotePlayerGameModel>>('/game/player/vote', 'get').subscribe({
      callback: (data: Array<VotePlayerGameModel>) => {
        for (let oneData of data) this.eventPlayerVote.emit(oneData)
      }
    })

    this.socketLinkPlayerMessage = this.eventSocketLink.registerReceiver<Array<MessageChatGameInterface>>('/game/chat', 'get').subscribe({
      callback: (data: Array<MessageChatGameInterface>) => {
        console.log(data)
        //for (let oneData of data) this.eventPlayerMessage.emit(oneData)
      }
    }) */
  }

  async ngAfterViewInit(): Promise<void> {
    let id: string | null = this.activatedRoute.snapshot.paramMap.get('gameId')

    console.log(id)

    if (id !== null) {
      console.log(id)
      const test = await this.socketSharedService.registerReceiver<StateGameModel>(`/game/${id}`, 'state-failed')
      test.subscribe((error: any) => {
        console.log(error)
      })

      this.stateLink = await this.socketSharedService.registerReceiver<StateGameModel>(`/game/${id}`, 'state')

      this.stateLink.subscribe(
        (data: StateGameModel) => {
          console.log(data)
          //this.eventGameState.emit(data)
        }
      )
    }
  }

  changeDisplayChatButtonCallback: () => void = () => {
    this.displayChat = !this.displayChat
  }
}
