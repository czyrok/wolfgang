import { Component, OnInit } from '@angular/core'
import { CardsProposalUserModel, LinkNamespaceSocketModel } from 'common'

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
    const cardsProposalLink: LinkNamespaceSocketModel<void, Array<CardsProposalUserModel>>
      = await this.socketSharedService.buildLink<void, Array<CardsProposalUserModel>>('/game/cards-proposal', 'list')

    cardsProposalLink.on((data: Array<CardsProposalUserModel>) => {
      cardsProposalLink.destroy()

      this.listCardsProposal = data
    })

    cardsProposalLink.emit()
  }

  getDate(date: string): string {
    const convertedDate: Date = new Date(date)

    return convertedDate.toLocaleDateString()
  }
}
