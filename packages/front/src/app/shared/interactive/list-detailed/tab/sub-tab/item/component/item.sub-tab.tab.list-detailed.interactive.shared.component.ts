import { Component, HostListener, Input } from '@angular/core'
import { ItemSubTabTabListDetailedInteractiveSharedModel } from '../model/item.sub-tab.tab.list-detailed.interactive.shared.model';

@Component({
  selector: 'app-shared-interactive-list-detailed-tab-sub-tab-item',
  templateUrl: './item.sub-tab.tab.list-detailed.interactive.shared.component.html',
  styleUrls: ['./item.sub-tab.tab.list-detailed.interactive.shared.component.scss']
})
export class ItemSubTabTabListDetailedInteractiveSharedComponent {
  @Input() item!: ItemSubTabTabListDetailedInteractiveSharedModel;
  @Input() isIconOnly!: boolean

  @HostListener('click') click(): void {
    if (this.item !== undefined && !this.item.isDisabled) this.item.callBack()
  }
}
