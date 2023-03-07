import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { CardsProposalUserModel, LinkNamespaceSocketModel, TypeVoteEnum, UserModel, VoteCardsProposalUserModel } from 'common'

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

  async ngOnInit(): Promise<void> {
    const id: string | null = this.activatedRoute.snapshot.paramMap.get('card_proposal_id')

    this.cardProposalId = id

    if (!this.userVoteCardProposal) this.setDefaultTypeUserVoteCardProposal()

    this.updateCardProposal()
    this.setUser()
  }

  async updateCardProposal(): Promise<void> {
    if (!this.cardProposalId) return

    const cardProposalLink: LinkNamespaceSocketModel<void, CardsProposalUserModel>
      = await this.socketSharedService.buildLink<void, CardsProposalUserModel>('/game/cards-proposal/view/' + this.cardProposalId, 'view')

    cardProposalLink.on((data: CardsProposalUserModel) => {
      cardProposalLink.destroy()

      this.cardProposal = data
    })

    cardProposalLink.emit()
  }

  async callbackThumbsDownCount(): Promise<void> {
    if (!this.cardProposalId) return

    const voteDownCardProposalLink: LinkNamespaceSocketModel<void, VoteCardsProposalUserModel>
      = await this.socketSharedService.buildLink<void, VoteCardsProposalUserModel>('/game/cards-proposal/view/' + this.cardProposalId, 'upThumbsDownCount')

    voteDownCardProposalLink.on((data: VoteCardsProposalUserModel) => {
      voteDownCardProposalLink.destroy()

      this.userVoteCardProposal = data

      this.updateCardProposal()
    })

    voteDownCardProposalLink.emit()
  }

  async callbackThumbsUpCount(): Promise<void> {
    if (!this.cardProposalId) return

    const voteUpCardProposalLink: LinkNamespaceSocketModel<void, VoteCardsProposalUserModel>
      = await this.socketSharedService.buildLink<void, VoteCardsProposalUserModel>('/game/cards-proposal/view/' + this.cardProposalId, 'upThumbsUpCount')

    voteUpCardProposalLink.on((data: VoteCardsProposalUserModel) => {
      voteUpCardProposalLink.destroy()

      this.userVoteCardProposal = data

      this.updateCardProposal()
    })

    voteUpCardProposalLink.emit()
  }

  async setUser(): Promise<void> {
    if (!this.cardProposalId) return

    const userLink: LinkNamespaceSocketModel<void, UserModel>
      = await this.socketSharedService.buildLink<void, UserModel>('/game/cards-proposal/view/' + this.cardProposalId, 'user')

    userLink.on((data: UserModel) => {
      userLink.destroy()

      this.user = data
    })

    userLink.emit()
  }

  async setDefaultTypeUserVoteCardProposal(): Promise<void> {
    if (!this.cardProposalId) return

    const voteUpCardProposalLink: LinkNamespaceSocketModel<void, VoteCardsProposalUserModel>
      = await this.socketSharedService.buildLink<void, VoteCardsProposalUserModel>('/game/cards-proposal/view/' + this.cardProposalId, 'initTypeUserVoteCardProposal')

    voteUpCardProposalLink.on((data: VoteCardsProposalUserModel) => {
      voteUpCardProposalLink.destroy()

      this.userVoteCardProposal = data
    })

    voteUpCardProposalLink.emit()
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

  getDate(): string {
    const date: Date = new Date(this.cardProposal?.releaseDate)

    return date.toLocaleDateString()
  }
}
