import { Component, Input } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { CosmeticModel, ReceiverLinkSocketModel, SenderLinkSocketModel, UserModel } from 'common'
import { SocketSharedService } from 'src/app/shared/socket/service/socket.shared.service'
import { AuthSharedService } from '../../../../../shared/auth/service/auth.shared.service'



@Component({
  selector: 'app-view-main-profile-default',
  templateUrl: './default.profile.main.view.component.html',
  styleUrls: ['./default.profile.main.view.component.scss']
})
export class DefaultProfileMainViewComponent {
  user!: UserModel
  cosmeticList!: Array<CosmeticModel>
  constructor(
    private eventSocketLink: SocketSharedService,
    private authSharedService: AuthSharedService,
    private activatedRoute: ActivatedRoute
  ) { }

  async ngAfterViewInit(): Promise<void> {
    const username : string | null = this.activatedRoute.snapshot.paramMap.get('username')

    if (username !== null) {
      const userLink: ReceiverLinkSocketModel<UserModel> = (await this.eventSocketLink.registerReceiver<UserModel>('/game/profile', 'view')).subscribe(
        (data: UserModel) => {
          this.user = data

          userLink.unsubscribe()
        }
      )

      const cosmeticLink: ReceiverLinkSocketModel<Array<CosmeticModel>> = (await this.eventSocketLink.registerReceiver<Array<CosmeticModel>>('/game/profile', 'skin')).subscribe(
        (data: Array<CosmeticModel>) => {
          this.cosmeticList = data 
        }
      )

      const cosmeticLinkEmit: SenderLinkSocketModel<string> = await this.eventSocketLink.registerSender<string>('/game/profile', 'skin')


      cosmeticLinkEmit.emit(username)

      const usernameLink: SenderLinkSocketModel<string> = await this.eventSocketLink.registerSender<string>('/game/profile', 'view')


      usernameLink.emit(username)
    }
  }

  getUsername(): string | undefined{
    return this.authSharedService.username
  }
}

