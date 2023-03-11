import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { CardsProposalUserModel, LinkNamespaceSocketModel, TypeVoteEnum, UserModel, VoteCardsProposalUserModel } from 'common'

import { SocketSharedService } from 'src/app/shared/socket/service/socket.shared.service'

@Component({
  selector: 'app-view-main-cards-proposal-view',
  templateUrl: './view.cards-proposal.main.view.component.html',
  styleUrls: ['./view.cards-proposal.main.view.component.scss']
})
/**
 * @classdesc Composant de la vue d'une proposition de carte
 * @implements OnInit
 */
export class ViewCardsProposalMainViewComponent implements OnInit {
  cardProposalId: string | null = null
  cardProposal!: CardsProposalUserModel

  user!: UserModel
  userVoteCardProposal!: VoteCardsProposalUserModel

  /**
   * @param socketSharedService Service qui permet d'utiliser des sockets
   * @param activatedRoute Permet d'accéder aux informations sur un itinéraire associé à un composant chargé dans un outlet
   */
  constructor(
    private socketSharedService: SocketSharedService,
    private activatedRoute: ActivatedRoute
  ) { }

  /**
   * Permet de déclencher le chargement de la proposition de carte
   */
  async ngOnInit(): Promise<void> {
    const id: string | null = this.activatedRoute.snapshot.paramMap.get('card_proposal_id')

    this.cardProposalId = id

    if (!this.userVoteCardProposal) this.setDefaultTypeUserVoteCardProposal()

    this.updateCardProposal()
    this.setUser()
  }

  /**
   * Permet d'actualiser une proposition de carte
   */
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

  /**
   * Permet à l'utilisateur de voter ou de dévoter le pouce en l'air de la proposition de carte
   */
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

  /**
   * Permet à l'utilisateur de voter ou de dévoter le pouce en bas de la proposition de carte
   */
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

  /**
   * Permet de charger l'utilisateur qui a fait la proposition de carte
   */
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

  /**
   * Permet d'intialiser le vote d'une proposition de carte
   */
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

  /**
   * Renvoie le type de vote effectuer par l'utilisateur connecté
   * @returns Le type
   */
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

  /**
   * Renvoie la date locale de la proposition de carte
   * @returns La date
   */
  getDate(): string {
    const date: Date = new Date(this.cardProposal?.releaseDate)

    return date.toLocaleDateString()
  }
}
