import { Component, Input } from '@angular/core'
import { ReceiverLinkSocketModel, SenderLinkSocketModel, UserModel } from 'common'

import { SocketSharedService } from 'src/app/shared/socket/service/socket.shared.service'

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
    private socketSharedService: SocketSharedService
  ) { }

  /**
   * Permet de récuperer le model d'un utilisateur
   */
  async ngAfterViewInit(): Promise<void> {
    if (this.username !== undefined) {

      const userLink: ReceiverLinkSocketModel<UserModel> = (await this.socketSharedService.registerReceiver<UserModel>('/game/profile', 'view')).subscribe(
        (data: UserModel) => {
          this.user = data

          userLink.unsubscribe()
        }
      )

      const usernameLink: SenderLinkSocketModel<string> = await this.socketSharedService.registerSender<string>('/game/profile', 'view')

      usernameLink.emit(this.username)
    }
  }

  /**
   * @returns Renvois le nom de l'utilisateur
   */
  getUsername(): string | undefined{
    return this.user?.username
  }

  @Input() username?: string
}
