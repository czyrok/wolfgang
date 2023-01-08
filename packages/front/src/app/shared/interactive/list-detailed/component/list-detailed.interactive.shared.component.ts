import { AfterViewInit, Component, Input } from '@angular/core'
import { ListDetailedInteractiveSharedModel } from '../model/list-detailed.interactive.shared.model';

@Component({
  selector: 'app-shared-interactive-list-detailed',
  templateUrl: './list-detailed.interactive.shared.component.html',
  styleUrls: ['./list-detailed.interactive.shared.component.scss']
})
export class ListDetailedInteractiveSharedComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    this.changeTab(this.list.tabList[0].title)
  }

  changeTab(title: string): void {
    this.list.visibilityEvent.emit(title)
  }

  @Input() list!: ListDetailedInteractiveSharedModel
}
