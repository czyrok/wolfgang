import { Component, Input } from '@angular/core'
import { ListInteractiveSharedModel } from '../model/list.interactive.shared.model'

@Component({
  selector: 'app-shared-interactive-list',
  templateUrl: './list.interactive.shared.component.html',
  styleUrls: ['./list.interactive.shared.component.scss']
})
/**
 * Correspond au composant associé au modèle d'une liste intéractive
 */
export class ListInteractiveSharedComponent {
  @Input() list!: ListInteractiveSharedModel;
}
