import { Component, Input } from '@angular/core'
import { TypeAlertEnum } from 'common'

@Component({
  selector: 'app-shared-alert-text',
  templateUrl: './text.alert.shared.component.html',
  styleUrls: ['./text.alert.shared.component.scss']
})
/**
 * @classdesc Gère le texte d'une alertecde type information
 */
export class TextAlertSharedComponent {
  @Input() icofont: string = 'info'

  @Input() text!: string
  @Input() type: TypeAlertEnum = TypeAlertEnum.INFORM

  @Input() detailed: boolean = false
}
