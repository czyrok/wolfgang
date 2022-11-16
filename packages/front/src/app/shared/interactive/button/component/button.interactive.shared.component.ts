import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-shared-interactive-button',
  templateUrl: './button.interactive.shared.component.html',
  styleUrls: ['./button.interactive.shared.component.scss']
})
export class ButtonInteractiveShared {
  @Input() link!: string
  @Input() text!: string
  @Input() icofont!: string
}
