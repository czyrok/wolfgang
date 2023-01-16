import { Component, Input } from '@angular/core'
import { ReceiverLinkSocketModel, SenderLinkSocketModel, UserModel } from 'common'
import { SocketSharedService } from 'src/app/shared/socket/service/socket.shared.service'

@Component({
  selector: 'app-shared-user-line-profile',
  templateUrl: './profile.line.user.shared.component.html',
  styleUrls: ['./profile.line.user.shared.component.scss']
})
export class ProfileLineUserSharedComponent {
  user!: UserModel

  async ngAfterViewInit(): Promise<void> {

    let reportLink: ReceiverLinkSocketModel<UserModel> = (await this.eventSocketLink.registerReceiver<UserModel>('/game/profile', 'view')).subscribe(
      (data: UserModel) => {
        this.user = data
        
      }
    )

    let usernameLink: SenderLinkSocketModel<string> = await this.eventSocketLink.registerSender<string>('/game/profile', 'view')
    if (this.username !== null) {
      usernameLink.emit(this.username)
    }
  }
  constructor(
    private eventSocketLink: SocketSharedService
  ) { }

  @Input() username!: string
}