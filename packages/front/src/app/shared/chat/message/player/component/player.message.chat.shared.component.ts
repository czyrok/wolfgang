import { AfterViewInit, Component, Input } from '@angular/core'
import { UserModel } from 'common'

import { AuthSharedService } from 'src/app/shared/auth/service/auth.shared.service'

@Component({
  selector: 'app-shared-chat-message-player',
  templateUrl: './player.message.chat.shared.component.html',
  styleUrls: ['./player.message.chat.shared.component.scss']
})
export class PlayerMessageChatSharedComponent implements AfterViewInit {
  display: boolean = false
  self!: boolean

  constructor(
    private authSharedService: AuthSharedService
  ) { }

  ngAfterViewInit(): void {
    if (this.user && this.user.username && this.user.username === this.authSharedService.username)
      this.self = true

    this.display = true
  }

  @Input() user!: UserModel
  @Input() text!: string
}
