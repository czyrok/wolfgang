import { Component, OnInit } from '@angular/core'
import { ListInteractiveSharedModel } from 'src/app/shared/interactive/list/model/list.interactive.shared.model'
import { ItemTabListInteractiveSharedModel } from 'src/app/shared/interactive/list/tab/item/model/item.tab.list.interactive.shared.model'
import { TabListInteractiveSharedModel } from 'src/app/shared/interactive/list/tab/model/tab.list.interactive.shared.model'

@Component({
  selector: 'app-view-play-rules',
  templateUrl: './rules.play.view.component.html',
  styleUrls: ['./rules.play.view.component.scss']
})
/**
 * Composant de la vue des règles dans une partie
 */
export class RulesPlayViewComponent implements OnInit {
  list!: ListInteractiveSharedModel

  /**
   * Initialise les règles de la partie
   */
  ngOnInit(): void {
    this.list = new ListInteractiveSharedModel()
      .addTab(new TabListInteractiveSharedModel()
        .setTitle("Carte de base")
        .setVisibility(true)
        .setIsIconOnly(true)
        .addItem(new ItemTabListInteractiveSharedModel()
          .setName("Loup garou gris")
          .setCount(0)
          .setIsDisabled(false)
          .setImgURL('https://m.gralon.net/medias-vignettes/articles/vignettes/le-loup-garou-un-personnage-de-legende-2252-700x700c.jpg'))
        .addItem(new ItemTabListInteractiveSharedModel()
          .setName("Villageois")
          .setIsDisabled(false)
          .setImgURL('https://m.gralon.net/medias-vignettes/articles/vignettes/le-loup-garou-un-personnage-de-legende-2252-700x700c.jpg'))
      )
      .addTab(new TabListInteractiveSharedModel()
        .setTitle("Carte de joueurs")
        .setVisibility(true)
        .setIsIconOnly(false)
        .addItem(new ItemTabListInteractiveSharedModel()
          .setName("Détective").setIsDisabled(false)
          .setCount(10))
        .addItem(new ItemTabListInteractiveSharedModel()
          .setName("Le fou").setIsDisabled(false)))
  }
}
