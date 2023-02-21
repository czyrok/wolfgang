import { AfterViewInit, Component, EventEmitter, OnDestroy } from '@angular/core'
import { Router } from '@angular/router'
import { StageStateGameEnum, TypeCardGameEnum, EventMessageChatGameModel, PlayerGameModel, MessageChatGameModel, ReceiverLinkSocketModel, SenderLinkSocketModel, StateGameModel, UserMessageChatGameModel, VotePlayerGameModel, MessageChatFormControllerModel, TypeMessageChatGameEnum, VoteFormControllerModel } from 'common'

import { GameSharedService } from 'src/app/shared/game/service/game.shared.service'
import { DisplayAlertSharedService } from 'src/app/shared/alert/display/service/display.alert.shared.service'
import { AuthSharedService } from 'src/app/shared/auth/service/auth.shared.service'

import { EventVoteUserSharedModel } from 'src/app/shared/user/vote/event/model/event.vote.user.shared.model'

import { DisplayAlertSharedInterface } from 'src/app/shared/alert/display/interface/display.alert.shared.interface'

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
  state?: StateGameModel

  cardAlert?: DisplayAlertSharedInterface

  message: string = ''
  sendMessageStatus: boolean = false

  gameStateEvent: EventEmitter<StateGameModel> = new EventEmitter
  playerMessageEvent: EventEmitter<UserMessageChatGameModel> = new EventEmitter
  voteEvent: EventVoteUserSharedModel = new EventVoteUserSharedModel
  eventMessageEvent: EventEmitter<EventMessageChatGameModel> = new EventEmitter

  constructor(
    private router: Router,
    private authSharedService: AuthSharedService,
    private gameSharedService: GameSharedService,
    private alertSharedService: DisplayAlertSharedService
  ) { }

  async ngAfterViewInit(): Promise<void> {
    await this.loadPlayer()
    await this.loadStateEvent()
    await this.loadVoteEvent()
    await this.loadChatEvent()
  }

  async ngOnDestroy(): Promise<void> {
    await this.quit()
  }

  async loadPlayer(): Promise<void> {
    const test: boolean = await this.gameSharedService.joinGameAsPlayer()

    if (!test) return

    const playerReceiverLink: ReceiverLinkSocketModel<PlayerGameModel> = await this.gameSharedService.registerGameReceiver('', 'playerState'),
      playerSenderLink: SenderLinkSocketModel<void> = await this.gameSharedService.registerGameSender('', 'playerState')

    playerReceiverLink.subscribe((player: PlayerGameModel) => {
      if (player) this.player = player

      if (!this.start && player !== undefined) {
        if (player.card.config.type === TypeCardGameEnum.GREY_WEREWOLF) {
          this.cardAlert = this.alertSharedService.emitWarning('Votre rôle est loup-garou', undefined, false)
        } else {
          this.cardAlert = this.alertSharedService.emitWarning('Votre rôle est villageois', undefined, false)
        }

        this.start = true
      }
    })

    playerSenderLink.emit()
  }

  async loadStateEvent(): Promise<void> {
    const stateReceiverLink: ReceiverLinkSocketModel<StateGameModel> = await this.gameSharedService.registerGameReceiver('', 'state'),
      stateSenderLink: SenderLinkSocketModel<void> = await this.gameSharedService.registerGameSender('', 'state')

    stateReceiverLink.subscribe(async (state: StateGameModel) => {
      this.gameStateEvent.emit(state)

      this.state = state

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

      if (state.stage === StageStateGameEnum.FINISHED) {
        this.alertSharedService.emitInform('Vous avez gagné 5 points de jeu')
      }
    })

    stateSenderLink.emit()
  }

  async loadVoteEvent(): Promise<void> {
    const getVoteReceiverLink: ReceiverLinkSocketModel<Array<VotePlayerGameModel>> = await this.gameSharedService.registerGameReceiver('', 'getVote'),
      getVoteErrorLink: ReceiverLinkSocketModel<Array<VotePlayerGameModel>> = await this.gameSharedService.registerGameReceiver('', 'getVote-failed'),
      getVoteSenderLink: SenderLinkSocketModel<void> = await this.gameSharedService.registerGameSender('', 'getVote')

    getVoteReceiverLink.subscribe((votesList: Array<VotePlayerGameModel>) => {
      getVoteReceiverLink.unsubscribe()
      getVoteErrorLink.unsubscribe()

      for (const vote of votesList) {
        this.voteEvent.playerVotingEvent.emit(new VoteFormControllerModel(vote.votingPlayer.user.username, vote.votedPlayer.user.username))
      }
    })

    getVoteErrorLink.subscribe(() => {
      getVoteErrorLink.unsubscribe()
      getVoteReceiverLink.unsubscribe()
    })

    getVoteSenderLink.emit()

    const resetVoteReceiverLink: ReceiverLinkSocketModel<Array<VotePlayerGameModel>> = await this.gameSharedService.registerGameReceiver('', 'resetVote')

    resetVoteReceiverLink.subscribe(() => {
      this.voteEvent.playerVotesResetEvent.emit()
    })

    const votingActionReceiverLink: ReceiverLinkSocketModel<VoteFormControllerModel> = await this.gameSharedService.registerGameReceiver('', 'votingAction'),
      votingActionSenderLink: SenderLinkSocketModel<VoteFormControllerModel> = await this.gameSharedService.registerGameSender('', 'votingAction'),
      unvotingActionReceiverLink: ReceiverLinkSocketModel<string> = await this.gameSharedService.registerGameReceiver('', 'unvotingAction'),
      unvotingActionSenderLink: SenderLinkSocketModel<void> = await this.gameSharedService.registerGameSender('', 'unvotingAction')

    votingActionReceiverLink.subscribe((vote: VoteFormControllerModel) => {
      this.voteEvent.playerVotingEvent.emit(vote)
    })

    this.voteEvent.avatarSelectEvent.subscribe((votedUsername: string) => {
      if (this.authSharedService.username)
        votingActionSenderLink.emit(new VoteFormControllerModel(this.authSharedService.username, votedUsername))
    })

    unvotingActionReceiverLink.subscribe((votingUsername: string) => {
      this.voteEvent.playerUnvotingEvent.emit(votingUsername)
    })

    this.voteEvent.avatarUnselectEvent.subscribe((votedUsername: string) => {
      unvotingActionSenderLink.emit()
    })
  }

  async loadChatEvent(): Promise<void> {
    const chatReceiverLink: ReceiverLinkSocketModel<Array<MessageChatGameModel>> = await this.gameSharedService.registerGameReceiver('', 'getChat'),
      chatSenderLink: SenderLinkSocketModel<void> = await this.gameSharedService.registerGameSender('', 'getChat')

    chatReceiverLink.subscribe((messages: Array<MessageChatGameModel>) => {
      for (const message of messages) {
        switch (message.type) {
          case TypeMessageChatGameEnum.EVENT:
            this.eventMessageEvent.emit(message as EventMessageChatGameModel)

            break
          case TypeMessageChatGameEnum.USER:
            this.playerMessageEvent.emit(message as UserMessageChatGameModel)

            break
        }
      }
    })

    chatSenderLink.emit()
  }

  async sendMessage(event: KeyboardEvent): Promise<void> {
    if (event.code === 'Enter' && this.player) {
      if (this.sendMessageStatus) return

      this.sendMessageStatus = true

      const emitReceiverLink: ReceiverLinkSocketModel<void> = await this.gameSharedService.registerGameReceiver('', 'emitMessage'),
        emitErrorLink: ReceiverLinkSocketModel<any> = await this.gameSharedService.registerGameReceiver('', 'emitMessage-failed'),
        emitSenderLink: SenderLinkSocketModel<MessageChatFormControllerModel> = await this.gameSharedService.registerGameSender('', 'emitMessage')

      emitReceiverLink.subscribe(() => {
        emitReceiverLink.unsubscribe()
        emitErrorLink.unsubscribe()

        this.sendMessageStatus = false
      })

      emitErrorLink.subscribe((error: any) => {
        emitReceiverLink.unsubscribe()
        emitErrorLink.unsubscribe()

        this.alertSharedService.emitDanger(error)
      })

      emitSenderLink.emit(new MessageChatFormControllerModel(this.message))

      this.message = ''
    }
  }

  async quit(): Promise<void> {
    await this.gameSharedService.quitParty()

    this.cardAlert?.componentRef?.instance.click()
  }

  changeDisplayChatButtonCallback(): void {
    this.displayChat = !this.displayChat
  }
}
