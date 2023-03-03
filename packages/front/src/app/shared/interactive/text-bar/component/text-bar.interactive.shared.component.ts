import { Component, EventEmitter, Output, Input } from '@angular/core'

@Component({
  selector: 'app-shared-interactive-text-bar',
  templateUrl: './text-bar.interactive.shared.component.html',
  styleUrls: ['./text-bar.interactive.shared.component.scss']
})
/**
 * @classdesc Gère les bars de texte
 */
export class TextBarInteractiveSharedComponent {
  _filter = ''

  /**
   * @returns Renvoie un filtre
   */
  get filter(): string {
    return this._filter
  }

  /**
   * Attribue et émet un filtre
   * @param value Le filtre à attribuer
   */
  set filter(value: string) {
    this._filter = value

    this.event.emit(this.filter)
  }

  @Output() event: EventEmitter<string> = new EventEmitter()
  @Input() id!: string
  @Input() placeholder!: string
  @Input() icofont!: string
  @Input() type: string = 'text'
  @Input() accent: boolean = false
  @Input() important: boolean = false
}
