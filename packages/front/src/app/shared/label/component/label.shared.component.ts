import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-shared-label',
  templateUrl: './label.shared.component.html',
  styleUrls: ['./label.shared.component.scss']
})
/**
 * @classdesc Gère les composants labels
 */
export class LabelSharedComponent {
  @Input() text!: string
  @Input() icofont!: string
  @Input() accent: boolean = false
  @Input() important: boolean = false
}
