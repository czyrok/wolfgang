import { Component, HostListener, Input } from '@angular/core'

@Component({
  selector: 'app-shared-interactive-button',
  templateUrl: './button.interactive.shared.component.html',
  styleUrls: ['./button.interactive.shared.component.scss']
})
export class ButtonInteractiveSharedComponent {
  @Input() link!: string
  @Input() callback!: () => void
  @Input() text!: string
  @Input() icofont!: string
  @Input() active: boolean = false
  @Input() accent: boolean = false
  @Input() important: boolean = false

  @HostListener('click') click(): void {
    if (this.callback !== undefined) this.callback()
  }
}