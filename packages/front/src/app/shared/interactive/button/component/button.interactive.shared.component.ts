import { Component, HostListener, Input, Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'app-shared-interactive-button',
  templateUrl: './button.interactive.shared.component.html',
  styleUrls: ['./button.interactive.shared.component.scss']
})
export class ButtonInteractiveSharedComponent {
  @Input() link!: string
  @Input() text!: string
  @Input() count!: number
  @Input() icofont!: string
  @Input() active: boolean = false
  @Input() accent: boolean = false
  @Input() important: boolean = false

  @Output() clickEvent: EventEmitter<void> = new EventEmitter

  @HostListener('click') click(): void {
    this.clickEvent.emit()
  }
}
