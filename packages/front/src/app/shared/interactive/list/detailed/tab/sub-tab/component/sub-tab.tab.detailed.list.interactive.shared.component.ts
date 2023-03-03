import { Component, Input } from '@angular/core'

import { SubTabTabDetailedListInteractiveSharedModel } from '../model/sub-tab.tab.detailed.list.interactive.shared.model'

@Component({
  selector: 'app-shared-interactive-list-detailed-tab-sub-tab',
  templateUrl: './sub-tab.tab.detailed.list.interactive.shared.component.html',
  styleUrls: ['./sub-tab.tab.detailed.list.interactive.shared.component.scss']
})
/**
 * @classdesc Gère les sous-tables des tableaux de listes interactives détaillées
 */
export class SubTabTabDetailedListInteractiveSharedComponent {
  @Input() subTab!: SubTabTabDetailedListInteractiveSharedModel
}
