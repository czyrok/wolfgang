import { Component } from '@angular/core'
import { CardsProposalUserModel } from 'common'

import { EventSocketService } from '../../../../../socket/event/service/event.socket.service'

import { ReceiverEventSocketModel } from 'src/app/socket/event/receiver/model/receiver.event.socket.model'

@Component({
  selector: 'app-view-main-cards-proposal-default',
  templateUrl: './default.cards-proposal.main.view.component.html',
  styleUrls: ['./default.cards-proposal.main.view.component.scss']
})
export class DefaultCardsProposalMainViewComponent {
  listCardsProposal!: Array<CardsProposalUserModel>

  cardsProposalLink: ReceiverEventSocketModel<Array<CardsProposalUserModel>> = this.eventSocketService.registerReceiver<Array<CardsProposalUserModel>>('/game/cards-proposal', 'list').subscribe({
    callback: (data: Array<CardsProposalUserModel>) => {
      this.listCardsProposal = data
    }
  })

  constructor(
    private eventSocketService: EventSocketService
  ) { }
}
