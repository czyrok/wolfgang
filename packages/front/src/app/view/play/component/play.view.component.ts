import { AfterViewInit, Component, EventEmitter } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { MessageChatGameInterface, ReceiverLinkSocketModel, SenderLinkSocketModel, StateGameModel, VotePlayerGameModel, HandlerEventLinkSocketModel } from 'common'

import { GameSharedService } from 'src/app/shared/game/service/game.shared.service'
import { SocketSharedService } from 'src/app/shared/socket/service/socket.shared.service'

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
    private socketSharedService: SocketSharedService,
    private gameSharedService: GameSharedService
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
    const sender: SenderLinkSocketModel<void> | undefined = await this.gameSharedService.eventHandler?.getSender('join')

    console.log(sender)
    sender?.emit()

    /* let id: string | null = this.activatedRoute.snapshot.paramMap.get('gameId')

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
    } */
  }

  changeDisplayChatButtonCallback: () => void = () => {
    this.displayChat = !this.displayChat
  }
}
