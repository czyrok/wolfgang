import { Component, Input, TemplateRef } from '@angular/core'

@Component({
  selector: 'app-shared-item-line',
  templateUrl: './line.item.shared.component.html',
  styleUrls: ['./line.item.shared.component.scss']
})
export class LineItemSharedComponent {
  @Input() link!: string

  @Input() contentTemplate!: TemplateRef<any>
  @Input() context!: any
}