import { Component, HostListener, Input } from '@angular/core'

import { ItemSubTabTabDetailedListInteractiveSharedModel } from '../model/item.sub-tab.tab.detailed.list.interactive.shared.model'

@Component({
  selector: 'app-shared-interactive-list-detailed-tab-sub-tab-item',
  templateUrl: './item.sub-tab.tab.detailed.list.interactive.shared.component.html',
  styleUrls: ['./item.sub-tab.tab.detailed.list.interactive.shared.component.scss']
})
/**
 * Gère les items de sous-tables des tableaux de listes interactives détaillées
 */
export class ItemSubTabTabDetailedListInteractiveSharedComponent {
  @Input() item!: ItemSubTabTabDetailedListInteractiveSharedModel<any>
  @Input() isIconOnly!: boolean

  @HostListener('click') click(): void {
    if (this.item !== undefined && !this.item.isDisabled) {
      this.item.callBack()
      this.item.setIsSelected(!this.item.isSelected)

      if (this.item.clickedItemEvent !== undefined) this.item.clickedItemEvent.next(this.item)
    }
  }
}
