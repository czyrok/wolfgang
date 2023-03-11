import { Component, Input } from '@angular/core'
import { DetailedListInteractiveSharedModel } from '../model/detailed.list.interactive.shared.model'

@Component({
  selector: 'app-shared-interactive-list-detailed',
  templateUrl: './detailed.list.interactive.shared.component.html',
  styleUrls: ['./detailed.list.interactive.shared.component.scss']
})
/**
 * @classdesc Gère les listes interactives détaillées
 */
export class DetailedListInteractiveSharedComponent {
  changeTab(title: string): void {
    this.list.visibilityEvent.emit(title)
  }

  @Input() list!: DetailedListInteractiveSharedModel
}
