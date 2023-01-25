import { AfterViewInit, Component, EventEmitter, OnDestroy } from '@angular/core'
import { TypeCardGameEnum, EventMessageChatGameModel, PlayerGameModel, MessageChatGameModel, ReceiverLinkSocketModel, SenderLinkSocketModel, StateGameModel, UserMessageChatGameModel, VotePlayerGameModel, MessageChatFormControllerModel, TypeChatGameEnum } from 'common'

import { GameSharedService } from 'src/app/shared/game/service/game.shared.service'
import { DisplayAlertSharedService } from 'src/app/shared/alert/display/service/display.alert.shared.service'

@Component({
  selector: 'app-view-play',
  templateUrl: './play.view.component.html',
  styleUrls: ['./play.view.component.scss']
})
export class PlayViewComponent implements AfterViewInit, OnDestroy {
  displayChat: boolean = true
  start: boolean = false
  chrono: number = -1
  timeout?: any

  player?: PlayerGameModel

  message: string = ''
  sendMessageStatus: boolean = false
  
  eventPlayerVote: EventEmitter<VotePlayerGameModel> = new EventEmitter
  //socketLinkPlayerVote!: ReceiverEventSocketModel<Array<VotePlayerGameModel>>
  
  gameStateEvent: EventEmitter<StateGameModel> = new EventEmitter
  playerMessageEvent: EventEmitter<UserMessageChatGameModel> = new EventEmitter
  eventMessageEvent: EventEmitter<EventMessageChatGameModel> = new EventEmitter

  constructor(
    private gameSharedService: GameSharedService,
    private alertSharedService: DisplayAlertSharedService
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
    const test: boolean = await this.gameSharedService.joinGameAsPlayer()

    if (test) {
      const playerReceiverLink: ReceiverLinkSocketModel<PlayerGameModel> = await this.gameSharedService.registerGameReceiver('', 'playerState'),
        playerSenderLink: SenderLinkSocketModel<void> = await this.gameSharedService.registerGameSender('', 'playerState')

      playerReceiverLink.subscribe((player: PlayerGameModel) => {
        if (player) this.player = player

        if (!this.start && player !== undefined) {
          if (player.card.config.type === TypeCardGameEnum.GREY_WEREWOLF) {
            this.alertSharedService.emitInform('Votre rôle est loup-garou', undefined, false)
          } else {
            this.alertSharedService.emitInform('Votre rôle est villageois', undefined, false)
          }

          this.start = true
        }
      })

      playerSenderLink.emit()
    }

    const stateReceiverLink: ReceiverLinkSocketModel<StateGameModel> = await this.gameSharedService.registerGameReceiver('', 'state'),
      stateSenderLink: SenderLinkSocketModel<void> = await this.gameSharedService.registerGameSender('', 'state')

    stateReceiverLink.subscribe((state: StateGameModel) => {
      this.gameStateEvent.emit(state)

      /* if (this.player) {
        let hisTurn: boolean = false

        console.log(state.currentBehaviorType)

        for (const behavior of state.currentBehaviorType) {
          if (this.player.hasBehavior(behavior)) {
            hisTurn = true
            break
          }
        }

        if (hisTurn) this.alertSharedService.emitInform('C\'est à votre tour !')
      } */

      if (state.endTurnDate !== undefined) state.endTurnDate = new Date(state.endTurnDate)

      const now: Date = new Date

      if (state.endTurnDate && state.endTurnDate > now) {
        const interval: number = Math.floor((state.endTurnDate.getTime() - now.getTime()) / 1000)

        this.chrono = interval

        if (this.timeout !== undefined) clearInterval(this.timeout)

        this.timeout = setInterval(() => {
          if (this.chrono > 0) {
            this.chrono--
          } else {
            clearInterval(this.timeout)
            this.timeout = undefined
          }
        }, 1e3)
      }
    })

    stateSenderLink.emit()

    const chatReceiverLink: ReceiverLinkSocketModel<Array<MessageChatGameModel>> = await this.gameSharedService.registerGameReceiver('', 'getChat'),
      chatSenderLink: SenderLinkSocketModel<void> = await this.gameSharedService.registerGameSender('', 'getChat')

    chatReceiverLink.subscribe((messages: Array<MessageChatGameModel>) => {
      for (const message of messages) {
        const trad: any = message

        if (trad.imageUrl) {
          this.eventMessageEvent.emit(message as EventMessageChatGameModel)
        } else {
          this.playerMessageEvent.emit(message as UserMessageChatGameModel)
        }
      }
    })

    chatSenderLink.emit()

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

  async ngOnDestroy(): Promise<void> {
    await this.gameSharedService.quitParty()
  }

  changeDisplayChatButtonCallback: () => void = () => {
    this.displayChat = !this.displayChat
  }

  async sendMessage(event: KeyboardEvent): Promise<void> {
    if (event.code === 'Enter' && this.player) {
      if (this.sendMessageStatus) return

      this.sendMessageStatus = true

      const message: UserMessageChatGameModel = new UserMessageChatGameModel(this.message)

      message.user = this.player.user as any

      const emitReceiverLink: ReceiverLinkSocketModel<void> = await this.gameSharedService.registerGameReceiver('', 'emitMessage'),
        emitSenderLink: SenderLinkSocketModel<MessageChatFormControllerModel> = await this.gameSharedService.registerGameSender('', 'emitMessage')

      emitReceiverLink.subscribe(() => {
        emitReceiverLink.unsubscribe()

        this.sendMessageStatus = false
      })

      emitSenderLink.emit(new MessageChatFormControllerModel(TypeChatGameEnum.ALIVE, this.message))

      this.message = ''
    }
  }
}
