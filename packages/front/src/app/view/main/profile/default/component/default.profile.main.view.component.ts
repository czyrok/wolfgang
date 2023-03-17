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
/**
 * Composant par défault de la vue du profil
 */
export class DefaultProfileMainViewComponent implements OnInit {
  username!: string
  user!: UserModel

  /**
   * @param socketSharedService Service qui permet d'utiliser des sockets
   * @param authSharedService Service d'authentification des utilisateurs
   * @param activatedRoute Permet d'accéder aux informations sur un itinéraire associé à un composant chargé dans un outlet
   */
  constructor(
    private socketSharedService: SocketSharedService,
    private authSharedService: AuthSharedService,
    private activatedRoute: ActivatedRoute
  ) { }

  /**
   * Permet de s'abonner au changement de routes afin de mettre à jour le pseudo de l'utilisateur du profile
   */
  async ngOnInit(): Promise<void> {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const username: string | null = paramMap.get('username')

      if (!username) return

      this.username = username

      this.setRender(username)
    })
  }

  /**
   * Permet de charger l'utilisateur associé au pseudo
   * @param username Le pseudo
   */
  async setRender(username: string): Promise<void> {
    const viewLink: LinkNamespaceSocketModel<void, UserModel>
      = await this.socketSharedService.buildLink<void, UserModel>('/game/profile/' + username, 'view')

    viewLink.on((data: UserModel) => {
      viewLink.destroy()

      this.user = data
    })

    viewLink.emit()
  }

  /**
   * Permet de savoir si ce profile correspond à l'utilisateur connecté
   * @returns Vrai si l'utilisateur l'est, faux sinon
   */
  isAuthUser(): boolean {
    return this.authSharedService.username === this.username
  }
}