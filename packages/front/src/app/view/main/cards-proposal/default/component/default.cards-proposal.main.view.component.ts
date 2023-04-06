import { Component, OnInit } from '@angular/core'
import { CardsProposalUserModel, LinkNamespaceSocketModel } from 'common'

import { SocketSharedService } from 'src/app/shared/socket/service/socket.shared.service'

@Component({
  selector: 'app-view-main-cards-proposal-default',
  templateUrl: './default.cards-proposal.main.view.component.html',
  styleUrls: ['./default.cards-proposal.main.view.component.scss']
})
/**
 * Compsant de la vue par défaut d'une proposition de carte
 * @implements OnInit
 */
export class DefaultCardsProposalMainViewComponent implements OnInit {
  listCardsProposal!: Array<CardsProposalUserModel>

  /**
   * @param socketSharedService Service qui permet d'utiliser des sockets
   */
  constructor(
    private socketSharedService: SocketSharedService
  ) { }

  /**
   * Permet d'initialiser la liste des propositions de carte avec les propositions existantes
   */
  async ngOnInit(): Promise<void> {
    const cardsProposalLink: LinkNamespaceSocketModel<void, Array<CardsProposalUserModel>>
      = await this.socketSharedService.buildLink<void, Array<CardsProposalUserModel>>('/game/cards-proposal', 'list')

    cardsProposalLink.on((data: Array<CardsProposalUserModel>) => {
      cardsProposalLink.destroy()

      this.listCardsProposal = data
    })

    cardsProposalLink.emit()
  }

  /**
   * @param date La date de la proposition de carte
   * @returns La date convertie en tant que String
   */
  getDate(date: string): string {
    const convertedDate: Date = new Date(date)

    return convertedDate.toLocaleDateString()
  }
}
