import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-shared-label',
  templateUrl: './label.shared.component.html',
  styleUrls: ['./label.shared.component.scss']
})
export class LabelShared {
  @Input() text!: string
  @Input() icofont!: string
  @Input() accent: boolean = false
  @Input() important: boolean = false
}