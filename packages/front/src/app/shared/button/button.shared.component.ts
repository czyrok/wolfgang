import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-shared-button',
  templateUrl: './button.shared.component.html',
  styleUrls: ['./button.shared.component.scss']
})
export class ButtonShared {
  @Input() text!: string
  @Input() icofont!: string
}
