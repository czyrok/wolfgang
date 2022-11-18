import { Component, EventEmitter, Output, Input } from '@angular/core'

@Component({
  selector: 'app-shared-interactive-text-bar',
  templateUrl: './text-bar.interactive.shared.component.html',
  styleUrls: ['./text-bar.interactive.shared.component.scss']
})
export class TextBarInteractiveSharedComponent {
  _filter = ''

  get filter(): string {
    return this._filter
  }

  set filter(value: string) {
    this._filter = value

    this.event.emit(this.filter)
  }

  @Output() event: EventEmitter<string> = new EventEmitter();
  @Input() placeholder!: string
  @Input() icofont!: string
  @Input() type: string = 'text'
  @Input() accent: boolean = false
  @Input() important: boolean = false
}
