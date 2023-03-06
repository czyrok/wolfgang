import { Component, Input } from '@angular/core'
import { LinkNamespaceSocketModel, UserModel } from 'common'

import { SocketSharedService } from 'src/app/shared/socket/service/socket.shared.service'
import { AuthSharedService } from 'src/app/shared/auth/service/auth.shared.service'

@Component({
  selector: 'app-shared-user-line-profile',
  templateUrl: './profile.line.user.shared.component.html',
  styleUrls: ['./profile.line.user.shared.component.scss']
})
export class ProfileLineUserSharedComponent {
  user!: UserModel

  constructor(
    private socketSharedService: SocketSharedService,
    private authSharedService: AuthSharedService
  ) { }

  async ngAfterViewInit(): Promise<void> {
    if (this.username !== undefined) {

      const userLink: LinkNamespaceSocketModel<string, UserModel> = await this.socketSharedService.buildLink<string, UserModel>('/game/profile', 'view')

      userLink.on((data: UserModel) => {
        userLink.destroy()

        this.user = data
      })

      userLink.emit(this.username)
    }
  }

  getUsername(): string | undefined {
    return this.authSharedService.username
  }

  @Input() username?: string
}
