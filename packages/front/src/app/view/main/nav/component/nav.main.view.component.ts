import { Component } from '@angular/core'
import { Router } from '@angular/router'

import { AuthSharedService } from 'src/app/shared/auth/service/auth.shared.service'

@Component({
  selector: 'app-view-main-nav',
  templateUrl: './nav.main.view.component.html',
  styleUrls: ['./nav.main.view.component.scss']
})
/**
 * @classdesc Composant de vue de la bar de navigation
 */
export class NavMainViewComponent {
  /**
   * @param router Service qui permet de naviguer entre les vues et de manipuler les URLs.
   * @param socketSharedService Service qui permet d'utiliser des sockets
   */
  constructor(
    private router: Router,
    private authSharedService: AuthSharedService
  ) { }

  /**
   * @returns Renvois le nom de l'utilisateur connecté
   */
  getUsername(): string {
    return this.authSharedService.username ?? ''
  }

  /**
   * @returns Renvois vrai si l'utilisateur est connecté et faux sinon
   */
  getIsAuth(): boolean {
    return this.authSharedService.isAuth
  }

  /**
   * Permet de déconnecter l'utilisateur et de le rediriger
   */
  async logoutCallback(): Promise<void> {
    await this.authSharedService.logOut()

    this.router.navigateByUrl('/')
  }
}
