import { Component, HostListener, Input } from '@angular/core'

import { ItemSubTabTabDetailedListInteractiveSharedModel } from '../model/item.sub-tab.tab.detailed.list.interactive.shared.model'

@Component({
  selector: 'app-shared-interactive-list-detailed-tab-sub-tab-item',
  templateUrl: './item.sub-tab.tab.detailed.list.interactive.shared.component.html',
  styleUrls: ['./item.sub-tab.tab.detailed.list.interactive.shared.component.scss']
})
export class ItemSubTabTabDetailedListInteractiveSharedComponent {
  @Input() item!: ItemSubTabTabDetailedListInteractiveSharedModel
  @Input() isIconOnly!: boolean

  @HostListener('click') click(): void {
    if (this.item !== undefined && !this.item.isDisabled) this.item.callBack()
  }
}
