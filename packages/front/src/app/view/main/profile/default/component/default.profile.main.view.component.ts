import { Component, Input, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { CosmeticModel, ReceiverLinkSocketModel, SenderLinkSocketModel, UserModel } from 'common'
import { SocketSharedService } from 'src/app/shared/socket/service/socket.shared.service'
import { AuthSharedService } from '../../../../../shared/auth/service/auth.shared.service'



@Component({
  selector: 'app-view-main-profile-default',
  templateUrl: './default.profile.main.view.component.html',
  styleUrls: ['./default.profile.main.view.component.scss']
})
export class DefaultProfileMainViewComponent implements OnInit {
  user!: UserModel
  username!: string

  constructor(
    private socketSharedService: SocketSharedService,
    private authSharedService: AuthSharedService,
    private activatedRoute: ActivatedRoute
  ) {
    const username: string | null = this.activatedRoute.snapshot.paramMap.get('username')

    if (username) this.username = username
  }

  async ngOnInit(): Promise<void> {
    const username: string | null = this.activatedRoute.snapshot.paramMap.get('username')

    if (username !== null) {
      const userLink: ReceiverLinkSocketModel<UserModel> = (await this.socketSharedService.registerReceiver<UserModel>('/game/profile', 'view')).subscribe(
        (data: UserModel) => {
          this.user = data

          userLink.unsubscribe()
        }
      )

      const usernameLink: SenderLinkSocketModel<string> = await this.socketSharedService.registerSender<string>('/game/profile', 'view')

      usernameLink.emit(username)
    }
  }

  getUsername(): string | undefined {
    return this.authSharedService.username
  }
}

