import { AfterViewInit, Component, Input } from '@angular/core'
import { DetailedListInteractiveSharedModel } from '../model/detailed.list.interactive.shared.model'

@Component({
  selector: 'app-shared-interactive-list-detailed',
  templateUrl: './detailed.list.interactive.shared.component.html',
  styleUrls: ['./detailed.list.interactive.shared.component.scss']
})
export class DetailedListInteractiveSharedComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    this.changeTab(this.list.tabList[0].title)
  }

  changeTab(title: string): void {
    this.list.visibilityEvent.emit(title)
  }

  @Input() list!: DetailedListInteractiveSharedModel
}
