import { Component, EventEmitter } from '@angular/core'
import { MessageChatGameInterface, StateGameModel, VotePlayerGameModel } from 'common'

import { EventSocketService } from 'src/app/socket/event/service/event.socket.service'

import { ReceiverEventSocketModel } from 'src/app/socket/event/receiver/model/receiver.event.socket.model'
import { SenderEventSocketModel } from 'src/app/socket/event/sender/model/sender.event.socket.model'
import { UserSharedService } from 'src/app/shared/user/service/user.shared.service'

@Component({
  selector: 'app-view-main-games-play',
  templateUrl: './play.games.main.view.component.html',
  styleUrls: ['./play.games.main.view.component.scss']
})
export class PlayGamesMainViewComponent {
  displayChat: boolean = true

  socketLinkGame: SenderEventSocketModel<string> = this.eventSocketLink.registerSender<string>('/game', 'join')

  eventGameState: EventEmitter<StateGameModel> = new EventEmitter
  socketLinkState: ReceiverEventSocketModel<StateGameModel> = this.eventSocketLink.registerReceiver<StateGameModel>('/game', 'state').subscribe({
    callback: (data: StateGameModel) => {
      this.eventGameState.emit(data)
      console.log(data)
    }
  })

  eventPlayerVote: EventEmitter<VotePlayerGameModel> = new EventEmitter
  socketLinkPlayerVote!: ReceiverEventSocketModel<Array<VotePlayerGameModel>>

  eventPlayerMessage: EventEmitter<MessageChatGameInterface> = new EventEmitter
  socketLinkPlayerMessage!: ReceiverEventSocketModel<Array<MessageChatGameInterface>>

  constructor(
    private userSharedService: UserSharedService,
    private eventSocketLink: EventSocketService
  ) {
    this.socketLinkGame.emit(this.userSharedService.username)

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
    })
  }

  changeDisplayChatButtonCallback: () => void = () => {
    this.displayChat = !this.displayChat
  }
}
