import { Component, Input, TemplateRef } from '@angular/core'

@Component({
  selector: 'app-view-page-scroll',
  templateUrl: './scroll.page.view.component.html',
  styleUrls: ['./scroll.page.view.component.scss']
})
export class ScrollPageViewComponent {
  @Input() title!: string
  
  @Input() buttonTemplate!: TemplateRef<any>
  @Input() contentTemplate!: TemplateRef<any>

  @Input() list: boolean = true
}
