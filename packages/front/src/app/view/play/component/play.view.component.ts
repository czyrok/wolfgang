import { AfterViewInit, Component, EventEmitter, OnDestroy } from '@angular/core'
import { Router } from '@angular/router'
import { StageStateGameEnum, TypeCardGameEnum, EventMessageChatGameModel, PlayerGameModel, MessageChatGameModel, StateGameModel, UserMessageChatGameModel, VotePlayerGameModel, MessageChatFormControllerModel, TypeMessageChatGameEnum, VoteFormControllerModel, LinkNamespaceSocketModel } from 'common'

import { GameSharedService } from 'src/app/shared/game/service/game.shared.service'
import { DisplayAlertSharedService } from 'src/app/shared/alert/display/service/display.alert.shared.service'
import { AuthSharedService } from 'src/app/shared/auth/service/auth.shared.service'

import { EventVoteUserSharedModel } from 'src/app/shared/user/vote/event/model/event.vote.user.shared.model'

import { DisplayAlertSharedInterface } from 'src/app/shared/alert/display/interface/display.alert.shared.interface'
import { Subscription } from 'rxjs'

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

  joinEventSub!: Subscription
  linkToDestroy: Array<LinkNamespaceSocketModel<any, any, any>> = new Array

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
    this.joinEventSub = this.gameSharedService.joinEvent.subscribe(async () => {
      await this.load()
    })

    await this.load()
  }

  async ngOnDestroy(): Promise<void> {
    await this.quit()
  }

  async load(): Promise<void> {
    await this.loadPlayer()
    await this.loadWinEvent()
    await this.loadStateEvent()
    await this.loadVoteEvent()
    await this.loadChatEvent()
  }

  async loadPlayer(): Promise<void> {
    const test: boolean = await this.gameSharedService.joinGameAsPlayer()

    if (!test) return

    console.log('???')

    const playerStateLink: LinkNamespaceSocketModel<void, PlayerGameModel>
      = await this.gameSharedService.buildBaseLink<void, PlayerGameModel>('playerState')

    playerStateLink.on((player: PlayerGameModel) => {
      if (player) this.player = player

      console.log('???2', this.state, this.state?.stage !== StageStateGameEnum.AWAITING, !this.start)

      if (player && !this.start) {
        console.log('???3', player)

        if (player.card.config.type === TypeCardGameEnum.GREY_WEREWOLF) {
          this.cardAlert = this.alertSharedService.emitWarning('Votre rôle est loup-garou', undefined, false)
        } else {
          this.cardAlert = this.alertSharedService.emitWarning('Votre rôle est villageois', undefined, false)
        }

        this.start = true
      }
    })

    playerStateLink.emit()
    
    this.linkToDestroy.push(playerStateLink)
  }

  async loadWinEvent(): Promise<void> {
    const winGamePointsLink: LinkNamespaceSocketModel<void, void>
      = await this.gameSharedService.buildBaseLink<void, void>('winGamePoints')

    winGamePointsLink.on(() => {
      this.alertSharedService.emitSuccess('Vous avez gagné 5 points de jeu')
    })

    this.linkToDestroy.push(winGamePointsLink)

    const winLevelLink: LinkNamespaceSocketModel<void, void>
      = await this.gameSharedService.buildBaseLink<void, void>('winLevel')

    winLevelLink.on(() => {
      this.alertSharedService.emitSuccess('Vous êtes monté d\'un niveau, félicitation !')
    })

    this.linkToDestroy.push(winLevelLink)
  }

  async loadStateEvent(): Promise<void> {
    const stateLink: LinkNamespaceSocketModel<void, StateGameModel>
      = await this.gameSharedService.buildBaseLink<void, StateGameModel>('state')

    stateLink.on(async (state: StateGameModel) => {
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

      if (state.stage === StageStateGameEnum.KILLED) {
        this.alertSharedService.emitInform('La partie a été supprimée')

        this.router.navigateByUrl('/game/currently')
      }
    })

    stateLink.emit()

    this.linkToDestroy.push(stateLink)
  }

  async loadVoteEvent(): Promise<void> {
    const getVoteLink: LinkNamespaceSocketModel<void, Array<VotePlayerGameModel>>
      = await this.gameSharedService.buildBaseLink<void, Array<VotePlayerGameModel>>('getVote')

    getVoteLink.on((votesList: Array<VotePlayerGameModel>) => {
      getVoteLink.destroy()

      for (const vote of votesList) {
        this.voteEvent.playerVotingEvent.emit(new VoteFormControllerModel(vote.votingPlayer.user.username, vote.votedPlayer.user.username))
      }
    })

    getVoteLink.onFail(() => {
      getVoteLink.destroy()
    })

    getVoteLink.emit()

    const resetVoteLink: LinkNamespaceSocketModel<void, void>
      = await this.gameSharedService.buildBaseLink<void, void>('resetVote')

    resetVoteLink.on(() => {
      this.voteEvent.playerVotesResetEvent.emit()
    })

    this.linkToDestroy.push(resetVoteLink)

    const votingActionLink: LinkNamespaceSocketModel<VoteFormControllerModel, VoteFormControllerModel>
      = await this.gameSharedService.buildBaseLink<VoteFormControllerModel, VoteFormControllerModel>('votingAction'),
      unvotingActionLink: LinkNamespaceSocketModel<void, string>
        = await this.gameSharedService.buildBaseLink<void, string>('unvotingAction')

    votingActionLink.on((vote: VoteFormControllerModel) => {
      this.voteEvent.playerVotingEvent.emit(vote)
    })

    this.voteEvent.avatarSelectEvent.subscribe((votedUsername: string) => {
      if (this.authSharedService.username)
        votingActionLink.emit(new VoteFormControllerModel(this.authSharedService.username, votedUsername))
    })

    unvotingActionLink.on((votingUsername: string) => {
      this.voteEvent.playerUnvotingEvent.emit(votingUsername)
    })

    this.voteEvent.avatarUnselectEvent.subscribe(() => {
      unvotingActionLink.emit()
    })

    this.linkToDestroy.push(votingActionLink)
    this.linkToDestroy.push(unvotingActionLink)
  }

  async loadChatEvent(): Promise<void> {
    const getChatLink: LinkNamespaceSocketModel<void, Array<MessageChatGameModel>>
      = await this.gameSharedService.buildBaseLink<void, Array<MessageChatGameModel>>('getChat')

    getChatLink.on((messages: Array<MessageChatGameModel>) => {
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

    getChatLink.emit()

    this.linkToDestroy.push(getChatLink)
  }

  async sendMessage(event: KeyboardEvent): Promise<void> {
    if (event.code === 'Enter' && this.player) {
      if (this.sendMessageStatus) return

      this.sendMessageStatus = true

      const emitMessageLink: LinkNamespaceSocketModel<MessageChatFormControllerModel, void>
        = await this.gameSharedService.buildBaseLink('emitMessage')

      emitMessageLink.on(() => {
        emitMessageLink.destroy()

        this.sendMessageStatus = false
      })

      emitMessageLink.onFail((error: any) => {
        emitMessageLink.destroy()

        this.alertSharedService.emitDanger(error)
      })

      emitMessageLink.emit(new MessageChatFormControllerModel(this.message))

      this.message = ''
    }
  }

  async quit(): Promise<void> {
    if (this.joinEventSub) this.joinEventSub.unsubscribe()

    for (const link of this.linkToDestroy) {
      link.destroy()
    }

    this.cardAlert?.componentRef?.instance.click()

    this.gameSharedService.quitParty()
  }

  changeDisplayChatButtonCallback(): void {
    this.displayChat = !this.displayChat
  }
}
