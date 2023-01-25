import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-shared-chat-message-player',
  templateUrl: './player.message.chat.shared.component.html',
  styleUrls: ['./player.message.chat.shared.component.scss']
})
export class PlayerMessageChatSharedComponent {
  self: boolean

  constructor() {
    this.self = false

    //if (this.userService.username == this.username) this.self = true
  }

  @Input() username!: string;
}
