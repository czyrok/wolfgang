import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { CardsProposalUserModel } from 'common'

import { EventSocketService } from '../../../../../socket/event/service/event.socket.service'

import { SenderEventSocketModel } from 'src/app/socket/event/sender/model/sender.event.socket.model'
import { ReceiverEventSocketModel } from 'src/app/socket/event/receiver/model/receiver.event.socket.model'

@Component({
  selector: 'app-view-main-cards-proposal-view',
  templateUrl: './view.cards-proposal.main.view.component.html',
  styleUrls: ['./view.cards-proposal.main.view.component.scss']
})
export class ViewCardsProposalMainViewComponent implements OnInit {
  cardProposal!: CardsProposalUserModel

  cardProposalLink: ReceiverEventSocketModel<CardsProposalUserModel> = this.eventSocketService.registerReceiver<CardsProposalUserModel>('/game/cards-proposal', 'view').subscribe({
    callback: (data: CardsProposalUserModel) => {
      this.cardProposal = data
    }
  })

  idLink: SenderEventSocketModel<string> = this.eventSocketService.registerSender<string>('/game/cards-proposal', 'view')

  constructor(
    private eventSocketService: EventSocketService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    let id: string | null = this.activatedRoute.snapshot.paramMap.get('id')

    if (id !== null) {
      this.idLink.emit(id)
    }
  }
}
