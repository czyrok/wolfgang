import { Component, Input } from '@angular/core'

import { TabDetailedListInteractiveSharedModel } from '../model/tab.detailed.list.interactive.shared.model'

@Component({
  selector: 'app-shared-interactive-list-detailed-tab',
  templateUrl: './tab.detailed.list.interactive.shared.component.html',
  styleUrls: ['./tab.detailed.list.interactive.shared.component.scss']
})
export class TabDetailedListInteractiveSharedComponent {
  @Input() tab!: TabDetailedListInteractiveSharedModel;

  click(): void {
    this.tab.setVisibility(!this.tab.visibility)
  }
}
