import { Component, Input, TemplateRef } from '@angular/core'

@Component({
  selector: 'app-shared-item-bubble',
  templateUrl: './bubble.item.shared.component.html',
  styleUrls: ['./bubble.item.shared.component.scss']
})
/**
 * Gère les composants bulles
 */
export class BubbleItemSharedComponent {
  @Input() contentTemplate!: TemplateRef<any>
}
