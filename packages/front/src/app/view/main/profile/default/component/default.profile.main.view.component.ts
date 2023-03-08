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
/**
 * @classdesc Composant par défault de la vue du profil
 */
export class DefaultProfileMainViewComponent implements OnInit {
  user!: UserModel
  username!: string

  /**
   * @param socketSharedService Service qui permet d'utiliser des sockets
   * @param authSharedService Service d'authentification des utilisateurs
   * @param activatedRoute Permet d'accéder aux informations sur un itinéraire associé à un composant chargé dans un outlet
   */
  constructor(
    private socketSharedService: SocketSharedService,
    private authSharedService: AuthSharedService,
    private activatedRoute: ActivatedRoute
  ) {
    const username: string | null = this.activatedRoute.snapshot.paramMap.get('username')

    console.log(username)

    if (username) this.username = username
  }

  /**
   * Initialisation de l'utilisateur pour le profil
   */
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

  /**
   * @returns Renvoie le nom de l'utilisateur
   */
  getUsername(): string | undefined {
    return this.authSharedService.username
  }
}

