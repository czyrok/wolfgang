import { Component, Input } from '@angular/core'

import { UserService } from 'src/app/user/service/user.service'

@Component({
  selector: 'app-shared-chat-message-player',
  templateUrl: './player.message.chat.shared.component.html',
  styleUrls: ['./player.message.chat.shared.component.scss']
})
export class PlayerMessageChatSharedComponent {
  self: boolean

  constructor(
    private userService: UserService
  ) {
    this.self = false

    if (this.userService.username == this.username) this.self = true
  }

  @Input() username!: string;
}
