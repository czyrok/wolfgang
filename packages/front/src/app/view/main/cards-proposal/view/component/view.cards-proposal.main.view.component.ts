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
  cardProposal!: CardsProposalUserModel
  user!:UserModel
  userVoteCardProposal!: VoteCardsProposalUserModel
  typeVote!: string

  constructor(
    private socketSharedService: SocketSharedService,
    private activatedRoute: ActivatedRoute
  ) { }

  async update(id: string): Promise<void>{

    const cardProposalLink: ReceiverLinkSocketModel<CardsProposalUserModel> = await this.socketSharedService.registerReceiver<CardsProposalUserModel>('/game/cards-proposal', 'view')

    cardProposalLink.subscribe((data: CardsProposalUserModel) => {
      this.cardProposal = data
      cardProposalLink.unsubscribe()
    })

    const triggerLink: SenderLinkSocketModel<string> = await this.socketSharedService.registerSender<string>('/game/cards-proposal', 'view')

    triggerLink.emit(id)
    this.getUser()
    this.getType()
  }

  async ngOnInit(): Promise<void> {
    const id: string | null =  this.activatedRoute.snapshot.paramMap.get('card_proposal_id')
    if(id!==null){
      this.update(id)
      this.getUser()
    }
  }

  async callbackThumbsDownCount(): Promise<void> {

    if (this.cardProposal === undefined) return

    const triggerLink: SenderLinkSocketModel<string> = await this.socketSharedService.registerSender<string>('/game/cards-proposal', 'upThumbsDownCount')
    const id: string | null =  this.activatedRoute.snapshot.paramMap.get('card_proposal_id')

    const voteDownCardProposalLink: ReceiverLinkSocketModel<VoteCardsProposalUserModel> = await this.socketSharedService.registerReceiver<VoteCardsProposalUserModel>('/game/cards-proposal', 'upThumbsDownCount')

    voteDownCardProposalLink.subscribe((data: VoteCardsProposalUserModel) => {
      this.userVoteCardProposal = data

      if(id!==null){
        this.update(id)
      }
      voteDownCardProposalLink.unsubscribe()
    })

    if(id!==null){
      triggerLink.emit(id)
      this.update(id)
    }
  }

  async callbackThumbsUpCount(): Promise<void> {

    if (this.cardProposal === undefined) return


    const triggerLink: SenderLinkSocketModel<string> = await this.socketSharedService.registerSender<string>('/game/cards-proposal', 'upThumbsUpCount')
    const id: string | null =  this.activatedRoute.snapshot.paramMap.get('card_proposal_id')

    const voteUpCardProposalLink: ReceiverLinkSocketModel<VoteCardsProposalUserModel> = await this.socketSharedService.registerReceiver<VoteCardsProposalUserModel>('/game/cards-proposal', 'upThumbsUpCount')

    voteUpCardProposalLink.subscribe((data: VoteCardsProposalUserModel) => {
      this.userVoteCardProposal = data

      if(id!==null){
        this.update(id)
      }
      voteUpCardProposalLink.unsubscribe()
    })

    if(id!==null){
      triggerLink.emit(id)
      this.update(id)
    }
  }

  async getUser(): Promise<void> {

    const cardProposalLink: ReceiverLinkSocketModel<UserModel> = await this.socketSharedService.registerReceiver<UserModel>('/game/cards-proposal', 'user')

    cardProposalLink.subscribe((data: UserModel) => {
      this.user = data

      cardProposalLink.unsubscribe()
    })



    const triggerLink: SenderLinkSocketModel<string> = await this.socketSharedService.registerSender<string>('/game/cards-proposal', 'user')
    const id: string | null =  this.activatedRoute.snapshot.paramMap.get('card_proposal_id')

    if(id!==null){
      triggerLink.emit(id)
    }
  }

  async getType():  Promise<void>{
    if(this.userVoteCardProposal === undefined || this.userVoteCardProposal.type===TypeVoteEnum.UNVOTED ){
      this.typeVote='undefined'
    }else if(this.userVoteCardProposal.type===TypeVoteEnum.THUMBSUPCOUNT){
      this.typeVote='up'
    }else if(this.userVoteCardProposal.type===TypeVoteEnum.THUMBSDOWNCOUNT){
      this.typeVote='down'
    }
  }

  getDate(): string | number {
    const date: Date = new Date(this.cardProposal.releaseDate)

    return date.toLocaleDateString()
  }
}
