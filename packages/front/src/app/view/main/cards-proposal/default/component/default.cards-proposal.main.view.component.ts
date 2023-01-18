import { Component, OnInit } from '@angular/core'
import { CardsProposalUserModel, ReceiverLinkSocketModel, SenderLinkSocketModel } from 'common'

import { SocketSharedService } from 'src/app/shared/socket/service/socket.shared.service'

@Component({
  selector: 'app-view-main-cards-proposal-default',
  templateUrl: './default.cards-proposal.main.view.component.html',
  styleUrls: ['./default.cards-proposal.main.view.component.scss']
})
export class DefaultCardsProposalMainViewComponent implements OnInit {
  listCardsProposal!: Array<CardsProposalUserModel>

  constructor(
    private socketSharedService: SocketSharedService
  ) { }

  async ngOnInit(): Promise<void> {
    const cardsProposalLink: ReceiverLinkSocketModel<Array<CardsProposalUserModel>> = await this.socketSharedService.registerReceiver<Array<CardsProposalUserModel>>('/game/cards-proposal', 'list')
    
    cardsProposalLink.subscribe((data: Array<CardsProposalUserModel>) => {
      this.listCardsProposal = data

      cardsProposalLink.unsubscribe()
    })

    const triggerLink: SenderLinkSocketModel<void> = await this.socketSharedService.registerSender<void>('/game/cards-proposal', 'list')

    triggerLink.emit()
  }
}
