import { Component, EventEmitter } from '@angular/core'
import { MessageChatGameInterface, StateGameModel, VotePlayerGameModel } from 'common'

import { EventSocketService } from 'src/app/socket/event/service/event.socket.service'
import { UserService } from 'src/app/user/service/user.service'

import { ReceiverEventSocketModel } from 'src/app/socket/event/receiver/model/receiver.event.socket.model'
import { SenderEventSocketModel } from 'src/app/socket/event/sender/model/sender.event.socket.model'

@Component({
  selector: 'app-view-play',
  templateUrl: './play.view.component.html',
  styleUrls: ['./play.view.component.scss']
})
export class PlayViewComponent {
  displayChat: boolean = false

  //socketLinkGame: SenderEventSocketModel<string> = this.eventSocketLink.registerSender<string>('/game', 'join')

  eventGameState: EventEmitter<StateGameModel> = new EventEmitter
  /* socketLinkState: ReceiverEventSocketModel<StateGameModel> = this.eventSocketLink.registerReceiver<StateGameModel>('/game', 'state').subscribe({
    callback: (data: StateGameModel) => {
      this.eventGameState.emit(data)
      console.log(data)
    }
  }) */

  eventPlayerVote: EventEmitter<VotePlayerGameModel> = new EventEmitter
  //socketLinkPlayerVote!: ReceiverEventSocketModel<Array<VotePlayerGameModel>>

  eventPlayerMessage: EventEmitter<MessageChatGameInterface> = new EventEmitter
  //socketLinkPlayerMessage!: ReceiverEventSocketModel<Array<MessageChatGameInterface>>

  constructor(
    private userService: UserService,
    /* private eventSocketLink: EventSocketService */
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

  changeDisplayChatButtonCallback: () => void = () => {
    this.displayChat = !this.displayChat
  }
}
