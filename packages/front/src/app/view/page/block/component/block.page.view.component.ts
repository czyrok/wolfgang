import { Component, Input, TemplateRef } from '@angular/core'

@Component({
  selector: 'app-view-page-block',
  templateUrl: './block.page.view.component.html',
  styleUrls: ['./block.page.view.component.scss']
})
export class BlockPageViewComponent {
  @Input() title!: string
  
  @Input() buttonTemplate!: TemplateRef<any>
  @Input() contentTemplate!: TemplateRef<any>
}
