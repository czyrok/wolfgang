import { Component } from '@angular/core'

import { AuthSharedService } from '../../../../shared/auth/service/auth.shared.service'

@Component({
  selector: 'app-view-home-default',
  templateUrl: './default.home.view.component.html',
  styleUrls: ['./default.home.view.component.scss']
})
/**
 * Composant de la vue home par défaut
 */
export class DefaultHomeViewComponent {
  /**
   * @param authSharedService Service d'autentification des utilisateurs
   */
  constructor(
    private authSharedService: AuthSharedService
  ) {
    this.authSharedService
  }

  /**
   * @returns Revoie vrai si l'utilisateur est connecté, sinon faux
   */
  isAuth(): boolean {
    return this.authSharedService.isAuth
  }

  /**
   * @returns Renvois le nom de l'utlisateur connecté
   */
  getUsername(): string | undefined{
    return this.authSharedService.username
  }
}
