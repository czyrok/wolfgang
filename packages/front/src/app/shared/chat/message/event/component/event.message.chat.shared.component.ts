import { Component, Input } from '@angular/core'
import { TypeAlertEnum } from 'common'

@Component({
  selector: 'app-shared-chat-message-event',
  templateUrl: './event.message.chat.shared.component.html',
  styleUrls: ['./event.message.chat.shared.component.scss']
})
/**
 * Gère les messages d'événement
 */
export class EventMessageChatSharedComponent {
  @Input() text!: string
  @Input() imageUrl!: string
  @Input() type!: TypeAlertEnum
}