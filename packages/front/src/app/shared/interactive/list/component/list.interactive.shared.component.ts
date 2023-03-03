import { AfterViewInit, Component, Input } from '@angular/core'
import { ListInteractiveSharedModel } from '../model/list.interactive.shared.model'

@Component({
  selector: 'app-shared-interactive-list',
  templateUrl: './list.interactive.shared.component.html',
  styleUrls: ['./list.interactive.shared.component.scss']
})
/**
 * @classdesc Gère les listes interactives
 * @implements AfterViewInit
 */
export class ListInteractiveSharedComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    console.log(this.list)
  }

  @Input() list!: ListInteractiveSharedModel;
}
