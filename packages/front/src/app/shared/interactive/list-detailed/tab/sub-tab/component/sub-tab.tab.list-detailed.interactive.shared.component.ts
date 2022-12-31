import { Component, Input } from '@angular/core'
import { SubTabTabListDetailedInteractiveSharedModel } from '../model/sub-tab.tab.list-detailed.interactive.shared.model';

@Component({
  selector: 'app-shared-interactive-list-detailed-tab-sub-tab',
  templateUrl: './sub-tab.tab.list-detailed.interactive.shared.component.html',
  styleUrls: ['./sub-tab.tab.list-detailed.interactive.shared.component.scss']
})
export class SubTabTabListDetailedInteractiveSharedComponent {
  @Input() tab!: SubTabTabListDetailedInteractiveSharedModel;

  click(): void {
    this.tab.setVisibility(!this.tab.visibility)
  }
}
