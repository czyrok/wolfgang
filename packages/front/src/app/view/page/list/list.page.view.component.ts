import { Component, Input, TemplateRef } from '@angular/core'

@Component({
  selector: 'app-view-page-list',
  templateUrl: './list.page.view.component.html',
  styleUrls: ['./list.page.view.component.scss']
})
export class ListPageViewComponent {
  @Input() title!: string
  
  @Input() buttonTemplate!: TemplateRef<any>
  @Input() contentTemplate!: TemplateRef<any>
}
