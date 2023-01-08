import { Component, OnInit } from '@angular/core'
import { ListDetailedInteractiveSharedModel } from 'src/app/shared/interactive/list-detailed/model/list-detailed.interactive.shared.model'
import { TabListDetailedInteractiveSharedModel } from 'src/app/shared/interactive/list-detailed/tab/model/tab.list-detailed.interactive.shared.model'
import { ItemSubTabTabListDetailedInteractiveSharedModel } from 'src/app/shared/interactive/list-detailed/tab/sub-tab/item/model/item.sub-tab.tab.list-detailed.interactive.shared.model'
import { SubTabTabListDetailedInteractiveSharedModel } from 'src/app/shared/interactive/list-detailed/tab/sub-tab/model/sub-tab.tab.list-detailed.interactive.shared.model'

import { ListInteractiveSharedModel } from 'src/app/shared/interactive/list/model/list.interactive.shared.model'
import { ItemTabListInteractiveSharedModel } from 'src/app/shared/interactive/list/tab/item/model/item.tab.list.interactive.shared.model'
import { TabListInteractiveSharedModel } from 'src/app/shared/interactive/list/tab/model/tab.list.interactive.shared.model'

@Component({
  selector: 'app-view-main-profile-skin-customization',
  templateUrl: './skin-customization.profile.main.view.component.html',
  styleUrls: ['./skin-customization.profile.main.view.component.scss']
})
export class SkinCustomizationProfileMainViewComponent implements OnInit {
  list!: ListDetailedInteractiveSharedModel

  ngOnInit(): void {
    this.list = new ListDetailedInteractiveSharedModel()
      .addTab(new TabListDetailedInteractiveSharedModel()
        .setTitle('Chapeau')
        .addSubTab(new SubTabTabListDetailedInteractiveSharedModel()
          .setTitle('Possédés')
          .setIsIconOnly(true)
          .addItem(new ItemSubTabTabListDetailedInteractiveSharedModel()
            .setName('Chap1')
            .setCount(0)
            .setIsDisabled(false)
            .setImgURL('https://m.gralon.net/medias-vignettes/articles/vignettes/le-loup-garou-un-personnage-de-legende-2252-700x700c.jpg')
          )
        )
        .addSubTab(new SubTabTabListDetailedInteractiveSharedModel()
          .setTitle('Non possédés')
          .setIsIconOnly(true)
          .addItem(new ItemSubTabTabListDetailedInteractiveSharedModel()
            .setName('Chap2')
            .setCount(0)
            .setIsDisabled(false)
            .setImgURL('https://m.gralon.net/medias-vignettes/articles/vignettes/le-loup-garou-un-personnage-de-legende-2252-700x700c.jpg')
          )
        )
      )
      .addTab(new TabListDetailedInteractiveSharedModel()
        .setTitle('Tête')
        .addSubTab(new SubTabTabListDetailedInteractiveSharedModel()
          .setTitle('Possédés')
          .setIsIconOnly(true)
          .addItem(new ItemSubTabTabListDetailedInteractiveSharedModel()
            .setName('Chap1')
            .setCount(0)
            .setIsDisabled(false)
            .setImgURL('https://m.gralon.net/medias-vignettes/articles/vignettes/le-loup-garou-un-personnage-de-legende-2252-700x700c.jpg')
          )
        )
        .addSubTab(new SubTabTabListDetailedInteractiveSharedModel()
          .setTitle('Non possédés')
          .setIsIconOnly(true)
          .addItem(new ItemSubTabTabListDetailedInteractiveSharedModel()
            .setName('Chap1')
            .setCount(10)
            .setIsDisabled(false)
            .setImgURL('https://m.gralon.net/medias-vignettes/articles/vignettes/le-loup-garou-un-personnage-de-legende-2252-700x700c.jpg')
          )
        )
      )
  }
}
