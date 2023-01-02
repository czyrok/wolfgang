import { Component, Input, TemplateRef } from '@angular/core'

@Component({
  selector: 'app-view-page-custom',
  templateUrl: './custom.page.view.component.html',
  styleUrls: ['./custom.page.view.component.scss']
})
export class CustomPageViewComponent {
  @Input() contentTemplate!: TemplateRef<any>
}