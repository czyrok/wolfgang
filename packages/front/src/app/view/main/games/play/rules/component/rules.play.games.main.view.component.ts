import { Component, OnInit } from '@angular/core'
import { ListInteractiveSharedModel } from 'src/app/shared/interactive/list/model/list.interactive.shared.model'
import { ItemTabListInteractiveSharedModel } from 'src/app/shared/interactive/list/tab/item/model/item.tab.list.interactive.shared.model'
import { TabListInteractiveSharedModel } from 'src/app/shared/interactive/list/tab/model/tab.list.interactive.shared.model'

@Component({
  selector: 'app-view-main-games-play-rules',
  templateUrl: './rules.play.games.main.view.component.html',
  styleUrls: ['./rules.play.games.main.view.component.scss']
})
export class RulesPlayGamesMainViewComponent implements OnInit {
  list!: ListInteractiveSharedModel

  ngOnInit(): void {
    this.list = new ListInteractiveSharedModel()
      .addTab(new TabListInteractiveSharedModel()
        .setTitle("carte de base")
        .setVisibility(true)
        .setIsIconOnly(true)
        .addItem(new ItemTabListInteractiveSharedModel()
          .setName("nom de la carte").setIsDisabled(false))
        .addItem(new ItemTabListInteractiveSharedModel()
          .setName("nom de la carte").setIsDisabled(false)))
      .addTab(new TabListInteractiveSharedModel()
        .setTitle("carte des joueurs")
        .setVisibility(true)
        .setIsIconOnly(true)
        .addItem(new ItemTabListInteractiveSharedModel()
          .setName("nom de la carte").setIsDisabled(false))
        .addItem(new ItemTabListInteractiveSharedModel()
          .setName("nom de la carte").setIsDisabled(false)))
  }
}
