import { Injectable } from '@angular/core'
import { CanActivate, Router, UrlTree } from '@angular/router'

import { AuthSharedService } from '../service/auth.shared.service'

@Injectable({
  providedIn: 'root'
})
export class AuthSharedGuard implements CanActivate {
  constructor(
    private router: Router,
    private authSharedService: AuthSharedService
  ) { }

  async canActivate(): Promise<boolean | UrlTree> {
    await this.authSharedService.testAuth()

    console.log('???')

    if (!this.authSharedService.isAuth) {
      return this.router.parseUrl('/log-in')
    } else {
      return true
    }
  }
}