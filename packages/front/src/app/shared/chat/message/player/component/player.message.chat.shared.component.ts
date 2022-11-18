import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-shared-chat-message-player',
  templateUrl: './player.message.chat.shared.component.html',
  styleUrls: ['./player.message.chat.shared.component.scss']
})
export class PlayerMessageChatSharedComponent {
  @Input() username!: string;
}
