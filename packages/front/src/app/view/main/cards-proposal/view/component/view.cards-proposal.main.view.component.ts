import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { CardsProposalUserModel, ReceiverLinkSocketModel, SenderLinkSocketModel, TypeVoteEnum, UserModel, VoteCardsProposalUserModel } from 'common'

import { SocketSharedService } from 'src/app/shared/socket/service/socket.shared.service'

@Component({
  selector: 'app-view-main-cards-proposal-view',
  templateUrl: './view.cards-proposal.main.view.component.html',
  styleUrls: ['./view.cards-proposal.main.view.component.scss']
})
export class ViewCardsProposalMainViewComponent implements OnInit {
  cardProposalId: string | null = null
  cardProposal!: CardsProposalUserModel

  user!: UserModel
  userVoteCardProposal!: VoteCardsProposalUserModel

  constructor(
    private socketSharedService: SocketSharedService,
    private activatedRoute: ActivatedRoute
  ) { }

  async updateCardProposal(): Promise<void> {
    const cardProposalLink: ReceiverLinkSocketModel<CardsProposalUserModel> = await this.socketSharedService.registerReceiver<CardsProposalUserModel>('/game/cards-proposal', 'view')

    cardProposalLink.subscribe((data: CardsProposalUserModel) => {
      this.cardProposal = data

      cardProposalLink.unsubscribe()
    })

    const triggerLink: SenderLinkSocketModel<string> = await this.socketSharedService.registerSender<string>('/game/cards-proposal', 'view')

    if (this.cardProposalId)
      triggerLink.emit(this.cardProposalId)
  }

  async ngOnInit(): Promise<void> {
    const id: string | null = this.activatedRoute.snapshot.paramMap.get('card_proposal_id')

    this.cardProposalId = id

    if(!this.userVoteCardProposal) this.setDefaultTypeUserVoteCardProposal()

    this.updateCardProposal()
    this.setUser()
  }

  async callbackThumbsDownCount(): Promise<void> {
    if (!this.cardProposal) return

    const triggerLink: SenderLinkSocketModel<string> = await this.socketSharedService.registerSender<string>('/game/cards-proposal', 'upThumbsDownCount')
    const voteDownCardProposalLink: ReceiverLinkSocketModel<VoteCardsProposalUserModel> = await this.socketSharedService.registerReceiver<VoteCardsProposalUserModel>('/game/cards-proposal', 'upThumbsDownCount')

    voteDownCardProposalLink.subscribe((data: VoteCardsProposalUserModel) => {
      this.userVoteCardProposal = data

      this.updateCardProposal()

      voteDownCardProposalLink.unsubscribe()
    })

    if (this.cardProposalId)
      triggerLink.emit(this.cardProposalId)
  }

  async callbackThumbsUpCount(): Promise<void> {
    if (!this.cardProposal) return

    const triggerLink: SenderLinkSocketModel<string> = await this.socketSharedService.registerSender<string>('/game/cards-proposal', 'upThumbsUpCount')
    const voteUpCardProposalLink: ReceiverLinkSocketModel<VoteCardsProposalUserModel> = await this.socketSharedService.registerReceiver<VoteCardsProposalUserModel>('/game/cards-proposal', 'upThumbsUpCount')

    voteUpCardProposalLink.subscribe((data: VoteCardsProposalUserModel) => {
      this.userVoteCardProposal = data

      this.updateCardProposal()

      voteUpCardProposalLink.unsubscribe()
    })
    if (this.cardProposalId)
      triggerLink.emit(this.cardProposalId)
  }

  async setUser(): Promise<void> {
    const cardProposalLink: ReceiverLinkSocketModel<UserModel> = await this.socketSharedService.registerReceiver<UserModel>('/game/cards-proposal', 'user')

    cardProposalLink.subscribe((data: UserModel) => {
      this.user = data

      cardProposalLink.unsubscribe()
    })

    const triggerLink: SenderLinkSocketModel<string> = await this.socketSharedService.registerSender<string>('/game/cards-proposal', 'user')

    if (this.cardProposalId)
      triggerLink.emit(this.cardProposalId)
  }

  getUserVoteType(): string {
    let typeVote!: string

    if (this.userVoteCardProposal === undefined) {
      typeVote = 'undef'
    }
    else if (this.userVoteCardProposal.type === TypeVoteEnum.THUMBSUPCOUNT) {
      typeVote = 'up'
    }
    else if (this.userVoteCardProposal.type === TypeVoteEnum.THUMBSDOWNCOUNT) {
      typeVote = 'down'
    }

    return typeVote
  }

  async setDefaultTypeUserVoteCardProposal(): Promise<void>{
    const voteUpCardProposalLink: ReceiverLinkSocketModel<VoteCardsProposalUserModel> = await this.socketSharedService.registerReceiver<VoteCardsProposalUserModel>('/game/cards-proposal', 'initTypeUserVoteCardProposal')

    voteUpCardProposalLink.subscribe((data: VoteCardsProposalUserModel) => {
      this.userVoteCardProposal = data

      voteUpCardProposalLink.unsubscribe()
    })

    const triggerLink: SenderLinkSocketModel<string> = await this.socketSharedService.registerSender<string>('/game/cards-proposal', 'initTypeUserVoteCardProposal')

    if (this.cardProposalId){
      triggerLink.emit(this.cardProposalId)
    }
  }

  getDate(): string {
    const date: Date = new Date(this.cardProposal?.releaseDate)

    return date.toLocaleDateString()
  }
}
