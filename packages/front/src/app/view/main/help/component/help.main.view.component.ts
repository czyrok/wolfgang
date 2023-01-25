import { Component } from '@angular/core'

import { DetailedListInteractiveSharedModel } from 'src/app/shared/interactive/list/detailed/model/detailed.list.interactive.shared.model'
import { TabDetailedListInteractiveSharedModel } from 'src/app/shared/interactive/list/detailed/tab/model/tab.detailed.list.interactive.shared.model'
import { ItemSubTabTabDetailedListInteractiveSharedModel } from 'src/app/shared/interactive/list/detailed/tab/sub-tab/item/model/item.sub-tab.tab.detailed.list.interactive.shared.model'
import { SubTabTabDetailedListInteractiveSharedModel } from 'src/app/shared/interactive/list/detailed/tab/sub-tab/model/sub-tab.tab.detailed.list.interactive.shared.model'

import cardsConfig from '../../../../../cards/config/cards.config.json'

@Component({
  selector: 'app-view-main',
  templateUrl: './help.main.view.component.html',
  styleUrls: ['./help.main.view.component.scss']
})
export class HelpMainViewComponent {
  list: DetailedListInteractiveSharedModel = new DetailedListInteractiveSharedModel
  desc!: string

  ngOnInit(): void {
    const gentilTab: TabDetailedListInteractiveSharedModel = new TabDetailedListInteractiveSharedModel
    const mechantTab: TabDetailedListInteractiveSharedModel = new TabDetailedListInteractiveSharedModel
    const autreTab: TabDetailedListInteractiveSharedModel = new TabDetailedListInteractiveSharedModel

    gentilTab.setTitle('Gentil').setVisibility(true)
    this.configureTabList(gentilTab, cardsConfig.cards.filter((card: any) => card.type === 'gentil'))

    mechantTab.setTitle('Mechant')
    this.configureTabList(mechantTab, cardsConfig.cards.filter((card: any) => card.type === 'mechant'))

    autreTab.setTitle('Autre')
    this.configureTabList(autreTab, cardsConfig.cards.filter((card: any) => card.type === 'autre'))
  }

  configureTabList(tab: TabDetailedListInteractiveSharedModel, cards: Array<any>): void {
    const tabUserCards: SubTabTabDetailedListInteractiveSharedModel = new SubTabTabDetailedListInteractiveSharedModel
    const tabBasicCards: SubTabTabDetailedListInteractiveSharedModel = new SubTabTabDetailedListInteractiveSharedModel

    tabBasicCards.setTitle('Carte de base').setIsIconOnly(true)
    tabUserCards.setTitle('Carte de joueurs').setIsIconOnly(true)

    for (const card of cards) {
      const item: ItemSubTabTabDetailedListInteractiveSharedModel = new ItemSubTabTabDetailedListInteractiveSharedModel()
        .setName(card.name)
        .setImgURL(`asset/img/${card.imageUrl}`)
        .setIsDisabled(false)
        .setCallBack(() => {
          this.desc = card.desc
        })

      if (card.is_player_card) {
        tabUserCards.addItem(item)
      } else {
        tabBasicCards.addItem(item)
      }

      if (this.desc === undefined) this.desc = card.desc
    }

    tab
      .addSubTab(tabBasicCards)
      .addSubTab(tabUserCards)

    this.list.addTab(tab)
  }

}
