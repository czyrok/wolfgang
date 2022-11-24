import { Component, HostListener, Input } from '@angular/core'
import { ItemTabListInteractiveSharedModel } from '../model/item.tab.list.interactive.shared.model';

@Component({
  selector: 'app-shared-interactive-list-tab-item',
  templateUrl: './item.tab.list.interactive.shared.component.html',
  styleUrls: ['./item.tab.list.interactive.shared.component.scss']
})
export class ItemTabListInteractiveSharedComponent {
  @Input() item!: ItemTabListInteractiveSharedModel;
  @Input() isIconOnly!: boolean

  @HostListener('click') click(): void {
    if (!this.item.isDisabled) this.item.callBack()
  }
}
