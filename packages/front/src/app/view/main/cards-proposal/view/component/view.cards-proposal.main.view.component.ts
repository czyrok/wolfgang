import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { CardsProposalUserModel, ReceiverLinkSocketModel, SenderLinkSocketModel } from 'common'

import { SocketSharedService } from 'src/app/shared/socket/service/socket.shared.service'

@Component({
  selector: 'app-view-main-cards-proposal-view',
  templateUrl: './view.cards-proposal.main.view.component.html',
  styleUrls: ['./view.cards-proposal.main.view.component.scss']
})
export class ViewCardsProposalMainViewComponent implements OnInit {
  cardProposal!: CardsProposalUserModel

  constructor(
    private socketSharedService: SocketSharedService,
    private activatedRoute: ActivatedRoute
  ) { }

  async ngOnInit(): Promise<void> {
    const id: string | null = this.activatedRoute.snapshot.paramMap.get('view_id')

    if (id !== null) {
      const cardProposalLink: ReceiverLinkSocketModel<CardsProposalUserModel> = await this.socketSharedService.registerReceiver<CardsProposalUserModel>('/game/cards-proposal', 'view')
      
      cardProposalLink.subscribe((data: CardsProposalUserModel) => {
        this.cardProposal = data

        cardProposalLink.unsubscribe()
      })

      const triggerLink: SenderLinkSocketModel<string> = await this.socketSharedService.registerSender<string>('/game/cards-proposal', 'view')

      triggerLink.emit(id)
    }
  }
}
