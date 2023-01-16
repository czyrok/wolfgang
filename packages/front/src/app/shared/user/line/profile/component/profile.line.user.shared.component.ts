import { Component, Input } from '@angular/core'
import { ReceiverLinkSocketModel, SenderLinkSocketModel, UserModel } from 'common'
import { SocketSharedService } from 'src/app/shared/socket/service/socket.shared.service'

import { AuthSharedService } from '../../../../../shared/auth/service/auth.shared.service'

@Component({
  selector: 'app-shared-user-line-profile',
  templateUrl: './profile.line.user.shared.component.html',
  styleUrls: ['./profile.line.user.shared.component.scss']
})
export class ProfileLineUserSharedComponent {
  user!: UserModel

  constructor(
    private eventSocketLink: SocketSharedService,
    private authSharedService: AuthSharedService,
  ) { }

  async ngAfterViewInit(): Promise<void> {
    if (this.username !== undefined) {
      const userLink: ReceiverLinkSocketModel<UserModel> = (await this.eventSocketLink.registerReceiver<UserModel>('/game/profile', 'view')).subscribe(
        (data: UserModel) => {
          this.user = data

          userLink.unsubscribe()
        }
      )

      const usernameLink: SenderLinkSocketModel<string> = await this.eventSocketLink.registerSender<string>('/game/profile', 'view')

      usernameLink.emit(this.username)
    }
  }

  getUsername(): string | undefined{
    return this.authSharedService.username
  }

  @Input() username?: string
}
