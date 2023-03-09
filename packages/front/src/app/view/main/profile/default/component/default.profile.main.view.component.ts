import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, ParamMap } from '@angular/router'
import { LinkNamespaceSocketModel, UserModel } from 'common'

import { SocketSharedService } from 'src/app/shared/socket/service/socket.shared.service'
import { AuthSharedService } from '../../../../../shared/auth/service/auth.shared.service'

@Component({
  selector: 'app-view-main-profile-default',
  templateUrl: './default.profile.main.view.component.html',
  styleUrls: ['./default.profile.main.view.component.scss']
})
export class DefaultProfileMainViewComponent implements OnInit {
  username!: string
  user!: UserModel

  constructor(
    private socketSharedService: SocketSharedService,
    private authSharedService: AuthSharedService,
    private activatedRoute: ActivatedRoute
  ) { }

  async ngOnInit(): Promise<void> {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const username: string | null = paramMap.get('username')

      if (!username) return

      this.username = username

      this.setRender(username)
    })
  }

  async setRender(username: string): Promise<void> {
    const viewLink: LinkNamespaceSocketModel<void, UserModel>
      = await this.socketSharedService.buildLink<void, UserModel>('/game/profile/' + username, 'view')

    viewLink.on((data: UserModel) => {
      viewLink.destroy()

      this.user = data
    })

    viewLink.emit()
  }

  isAuthUser(): boolean {
    return this.authSharedService.username === this.username
  }
}