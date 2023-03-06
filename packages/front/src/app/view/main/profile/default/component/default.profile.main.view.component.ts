import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { LinkNamespaceSocketModel, UserModel } from 'common'

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

    if (!username) return

    const viewLink: LinkNamespaceSocketModel<string, UserModel>
      = await this.socketSharedService.buildLink<string, UserModel>('/game/profile', 'view')

    viewLink.on((data: UserModel) => {
      viewLink.destroy()

      this.user = data
    })

    viewLink.emit(username)
  }

  getUsername(): string | undefined {
    return this.authSharedService.username
  }
}