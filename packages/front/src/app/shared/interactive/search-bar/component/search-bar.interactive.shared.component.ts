import { Component, EventEmitter, Output, Input } from '@angular/core'

@Component({
  selector: 'app-shared-interactive-search-bar',
  templateUrl: './search-bar.interactive.shared.component.html',
  styleUrls: ['./search-bar.interactive.shared.component.scss']
})
export class SearchBarInteractiveShared {
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
  @Input() accent: boolean = false
  @Input() important: boolean = false
}
