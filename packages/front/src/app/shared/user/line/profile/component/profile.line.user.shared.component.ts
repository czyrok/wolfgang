import { Component, Input } from '@angular/core'
import { LinkNamespaceSocketModel, UserModel } from 'common'

import { SocketSharedService } from 'src/app/shared/socket/service/socket.shared.service'
import { AuthSharedService } from 'src/app/shared/auth/service/auth.shared.service'

@Component({
  selector: 'app-shared-user-line-profile',
  templateUrl: './profile.line.user.shared.component.html',
  styleUrls: ['./profile.line.user.shared.component.scss']
})
/**
 * @classdesc Gère le composant du profile, en ligne, d'un utilisateur
 */
export class ProfileLineUserSharedComponent {
  user!: UserModel

  /**
   * @param socketSharedService Service de sockets
   */
  constructor(
    private socketSharedService: SocketSharedService,
    private authSharedService: AuthSharedService
  ) { }

  /**
   * Permet de récuperer le model d'un utilisateur
   */
  async ngAfterViewInit(): Promise<void> {
    if (!this.username) return

    const viewLink: LinkNamespaceSocketModel<void, UserModel> = await this.socketSharedService.buildLink<void, UserModel>('/game/profile/' + this.username, 'view')

    viewLink.on((data: UserModel) => {
      viewLink.destroy()

      this.user = data
    })

    viewLink.emit()
  }

  /**
   * @returns Renvoie le nom de l'utilisateur connecté
   */
  getUsername(): string | undefined {
    return this.authSharedService.username
  }

  @Input() username?: string
}
