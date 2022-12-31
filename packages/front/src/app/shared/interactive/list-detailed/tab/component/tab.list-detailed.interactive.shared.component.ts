import { Component, Input } from '@angular/core'
import { TabListDetailedInteractiveSharedModel } from '../model/tab.list-detailed.interactive.shared.model';

@Component({
  selector: 'app-shared-interactive-list-detailed-tab',
  templateUrl: './tab.list-detailed.interactive.shared.component.html',
  styleUrls: ['./tab.list-detailed.interactive.shared.component.scss']
})
export class TabListDetailedInteractiveSharedComponent {
  @Input() tab!: TabListDetailedInteractiveSharedModel;

  click(): void {
    this.tab.setVisibility(!this.tab.visibility)
  }
}
