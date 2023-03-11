import { Component, HostListener, Input } from '@angular/core'
import { TabListInteractiveSharedModel } from '../model/tab.list.interactive.shared.model';

@Component({
  selector: 'app-shared-interactive-list-tab',
  templateUrl: './tab.list.interactive.shared.component.html',
  styleUrls: ['./tab.list.interactive.shared.component.scss']
})
/**
 * @classdesc Gère les listes de tableaux interactifs
 */
export class TabListInteractiveSharedComponent {
  @Input() tab!: TabListInteractiveSharedModel;

  click(): void {
    this.tab.setVisibility(!this.tab.visibility)
  }
}
