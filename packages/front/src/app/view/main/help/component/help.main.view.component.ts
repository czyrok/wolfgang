import { Component } from '@angular/core'

import { DetailedListInteractiveSharedModel } from 'src/app/shared/interactive/list/detailed/model/detailed.list.interactive.shared.model'
import { TabDetailedListInteractiveSharedModel } from 'src/app/shared/interactive/list/detailed/tab/model/tab.detailed.list.interactive.shared.model'
import { ItemSubTabTabDetailedListInteractiveSharedModel } from 'src/app/shared/interactive/list/detailed/tab/sub-tab/item/model/item.sub-tab.tab.detailed.list.interactive.shared.model'
import { SubTabTabDetailedListInteractiveSharedModel } from 'src/app/shared/interactive/list/detailed/tab/sub-tab/model/sub-tab.tab.detailed.list.interactive.shared.model'

@Component({
  selector: 'app-view-main',
  templateUrl: './help.main.view.component.html',
  styleUrls: ['./help.main.view.component.scss']
})
export class HelpMainViewComponent {
  list!: DetailedListInteractiveSharedModel

  ngOnInit(): void {
    this.list = new DetailedListInteractiveSharedModel()
      .addTab(new TabDetailedListInteractiveSharedModel()
        .setTitle('Gentil')
        .addSubTab(new SubTabTabDetailedListInteractiveSharedModel()
          .setTitle('Carte de base')
          .setIsIconOnly(true)
          .addItem(new ItemSubTabTabDetailedListInteractiveSharedModel()
            .setName('Loup garou')
            .setImgURL('https://m.gralon.net/medias-vignettes/articles/vignettes/le-loup-garou-un-personnage-de-legende-2252-700x700c.jpg')
          )
        )
        .addSubTab(new SubTabTabDetailedListInteractiveSharedModel()
          .setTitle('Carte de joueurs')
          .setIsIconOnly(true)
          .addItem(new ItemSubTabTabDetailedListInteractiveSharedModel()
            .setName('Loup garou')
            .setImgURL('https://m.gralon.net/medias-vignettes/articles/vignettes/le-loup-garou-un-personnage-de-legende-2252-700x700c.jpg')
          )
        )
      )
      .addTab(new TabDetailedListInteractiveSharedModel()
        .setTitle('Méchant')
        .addSubTab(new SubTabTabDetailedListInteractiveSharedModel()
          .setTitle('Carte de base')
          .setIsIconOnly(true)
          .addItem(new ItemSubTabTabDetailedListInteractiveSharedModel()
            .setName('Loup garou')
            .setImgURL('https://m.gralon.net/medias-vignettes/articles/vignettes/le-loup-garou-un-personnage-de-legende-2252-700x700c.jpg')
          )
        )
        .addSubTab(new SubTabTabDetailedListInteractiveSharedModel()
          .setTitle('Carte de joueurs')
          .setIsIconOnly(true)
          .addItem(new ItemSubTabTabDetailedListInteractiveSharedModel()
            .setName('Loup garou')
            .setImgURL('https://m.gralon.net/medias-vignettes/articles/vignettes/le-loup-garou-un-personnage-de-legende-2252-700x700c.jpg')
          )
        )
      )
      .addTab(new TabDetailedListInteractiveSharedModel()
        .setTitle('Autre')
        .addSubTab(new SubTabTabDetailedListInteractiveSharedModel()
          .setTitle('Carte de base')
          .setIsIconOnly(true)
          .addItem(new ItemSubTabTabDetailedListInteractiveSharedModel()
            .setName('Loup garou')
            .setImgURL('https://m.gralon.net/medias-vignettes/articles/vignettes/le-loup-garou-un-personnage-de-legende-2252-700x700c.jpg')
          )
        )
        .addSubTab(new SubTabTabDetailedListInteractiveSharedModel()
          .setTitle('Carte de joueurs')
          .setIsIconOnly(true)
          .addItem(new ItemSubTabTabDetailedListInteractiveSharedModel()
            .setName('Loup garou')
            .setImgURL('https://m.gralon.net/medias-vignettes/articles/vignettes/le-loup-garou-un-personnage-de-legende-2252-700x700c.jpg')
          )
        )
      )
  }
}
