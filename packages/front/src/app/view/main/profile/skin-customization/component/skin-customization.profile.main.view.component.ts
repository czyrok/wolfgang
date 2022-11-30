import { Component } from '@angular/core'

import { ListInteractiveSharedModel } from 'src/app/shared/interactive/list/model/list.interactive.shared.model'
import { ItemTabListInteractiveSharedModel } from 'src/app/shared/interactive/list/tab/item/model/item.tab.list.interactive.shared.model'
import { TabListInteractiveSharedModel } from 'src/app/shared/interactive/list/tab/model/tab.list.interactive.shared.model'

@Component({
  selector: 'app-view-main-profile-skin-customization',
  templateUrl: './skin-customization.profile.main.view.component.html',
  styleUrls: ['./skin-customization.profile.main.view.component.scss']
})
export class SkinCustomizationProfileMainViewComponent {
  list!: ListInteractiveSharedModel

  ngOnInit(): void {
    this.list = new ListInteractiveSharedModel()
      .addTab(new TabListInteractiveSharedModel()
        .setTitle("Hat")
        .setVisibility(true)
        .setIsIconOnly(true)
        .addItem(new ItemTabListInteractiveSharedModel()
          .setName("chapeau loup garou gris")
          .setIsDisabled(false)
          .setImgURL('https://m.gralon.net/medias-vignettes/articles/vignettes/le-loup-garou-un-personnage-de-legende-2252-700x700c.jpg'))
      )
      .addTab(new TabListInteractiveSharedModel()
        .setTitle("Head")
        .setVisibility(true)
        .setIsIconOnly(true)
        .addItem(new ItemTabListInteractiveSharedModel()
          .setName("lunette loup garou gris")
          .setIsDisabled(false)
          .setImgURL('https://m.gralon.net/medias-vignettes/articles/vignettes/le-loup-garou-un-personnage-de-legende-2252-700x700c.jpg'))
      )
      .addTab(new TabListInteractiveSharedModel()
        .setTitle("Top")
        .setVisibility(true)
        .setIsIconOnly(true)
        .addItem(new ItemTabListInteractiveSharedModel()
          .setName("haut loup garou gris")
          .setIsDisabled(false)
          .setImgURL('https://m.gralon.net/medias-vignettes/articles/vignettes/le-loup-garou-un-personnage-de-legende-2252-700x700c.jpg'))
      )
      .addTab(new TabListInteractiveSharedModel()
        .setTitle("Pants")
        .setVisibility(true)
        .setIsIconOnly(true)
        .addItem(new ItemTabListInteractiveSharedModel()
          .setName("pants loup garou gris")
          .setIsDisabled(false)
          .setImgURL('https://m.gralon.net/medias-vignettes/articles/vignettes/le-loup-garou-un-personnage-de-legende-2252-700x700c.jpg'))
      )
      .addTab(new TabListInteractiveSharedModel()
        .setTitle("Shoes")
        .setVisibility(true)
        .setIsIconOnly(true)
        .addItem(new ItemTabListInteractiveSharedModel()
          .setName("chaussures loup garou gris")
          .setIsDisabled(false)
          .setImgURL('https://m.gralon.net/medias-vignettes/articles/vignettes/le-loup-garou-un-personnage-de-legende-2252-700x700c.jpg'))
      )
  }  
}
