import { Injectable } from '@angular/core'
import { CanActivate, Router, UrlTree } from '@angular/router'

import { AuthSharedService } from '../service/auth.shared.service'

@Injectable({
  providedIn: 'root'
})

/**
 * Gère l'accès des pages selon l'authentification
 * @implements CanActivate
 */
export class AuthSharedGuard implements CanActivate {
  /**
   * @param router Permet de rediriger
   * @param authSharedService Pour accéder au service d'authentification
   */
  constructor(
    private router: Router,
    private authSharedService: AuthSharedService
  ) { }

/**
 * Fonction de vérification d'accès en fonction de l'authentification de l'utilisateur
 * @returns Redirige sur la page log-in si l'utilisateur n'set pas connecté, ou autorise l'accès a la page
 */
  async canActivate(): Promise<boolean | UrlTree> {
    await this.authSharedService.testAuth()

    if (!this.authSharedService.isAuth) {
      return this.router.parseUrl('/log-in')
    } else {
      return true
    }
  }
}
