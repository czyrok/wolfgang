import { Component, OnInit } from '@angular/core'

import { DetailedListInteractiveSharedModel } from 'src/app/shared/interactive/list/detailed/model/detailed.list.interactive.shared.model'
import { TabDetailedListInteractiveSharedModel } from 'src/app/shared/interactive/list/detailed/tab/model/tab.detailed.list.interactive.shared.model'
import { ItemSubTabTabDetailedListInteractiveSharedModel } from 'src/app/shared/interactive/list/detailed/tab/sub-tab/item/model/item.sub-tab.tab.detailed.list.interactive.shared.model'
import { SubTabTabDetailedListInteractiveSharedModel } from 'src/app/shared/interactive/list/detailed/tab/sub-tab/model/sub-tab.tab.detailed.list.interactive.shared.model'

@Component({
  selector: 'app-view-main-profile-skin-customization',
  templateUrl: './skin-customization.profile.main.view.component.html',
  styleUrls: ['./skin-customization.profile.main.view.component.scss']
})
export class SkinCustomizationProfileMainViewComponent implements OnInit {
  list!: DetailedListInteractiveSharedModel

  ngOnInit(): void {
    this.list = new DetailedListInteractiveSharedModel()
      .addTab(new TabDetailedListInteractiveSharedModel()
        .setTitle('Chapeau')
        .addSubTab(new SubTabTabDetailedListInteractiveSharedModel()
          .setTitle('Possédés')
          .setIsIconOnly(true)
          .addItem(new ItemSubTabTabDetailedListInteractiveSharedModel()
            .setName('Chap1')
            .setCount(0)
            .setIsDisabled(false)
            .setImgURL('https://m.gralon.net/medias-vignettes/articles/vignettes/le-loup-garou-un-personnage-de-legende-2252-700x700c.jpg')
          )
        )
        .addSubTab(new SubTabTabDetailedListInteractiveSharedModel()
          .setTitle('Non possédés')
          .setIsIconOnly(true)
          .addItem(new ItemSubTabTabDetailedListInteractiveSharedModel()
            .setName('Chap2')
            .setCount(0)
            .setIsDisabled(false)
            .setImgURL('https://m.gralon.net/medias-vignettes/articles/vignettes/le-loup-garou-un-personnage-de-legende-2252-700x700c.jpg')
          )
        )
      )
      .addTab(new TabDetailedListInteractiveSharedModel()
        .setTitle('Tête')
        .addSubTab(new SubTabTabDetailedListInteractiveSharedModel()
          .setTitle('Possédés')
          .setIsIconOnly(true)
          .addItem(new ItemSubTabTabDetailedListInteractiveSharedModel()
            .setName('Chap1')
            .setCount(0)
            .setIsDisabled(false)
            .setImgURL('https://m.gralon.net/medias-vignettes/articles/vignettes/le-loup-garou-un-personnage-de-legende-2252-700x700c.jpg')
          )
        )
        .addSubTab(new SubTabTabDetailedListInteractiveSharedModel()
          .setTitle('Non possédés')
          .setIsIconOnly(true)
          .addItem(new ItemSubTabTabDetailedListInteractiveSharedModel()
            .setName('Chap1')
            .setCount(10)
            .setIsDisabled(false)
            .setImgURL('https://m.gralon.net/medias-vignettes/articles/vignettes/le-loup-garou-un-personnage-de-legende-2252-700x700c.jpg')
          )
        )
      )
  }
}
