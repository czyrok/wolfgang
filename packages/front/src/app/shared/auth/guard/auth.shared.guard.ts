import { Injectable } from '@angular/core'
import { CanActivate, Router } from '@angular/router'

import { AuthSharedService } from '../service/auth.shared.service'

@Injectable({
    providedIn: 'root'
})
export class AuthSharedGuard implements CanActivate {
  constructor(
    private router: Router,
    private authSharedService: AuthSharedService
  ) { }

  canActivate() {
    this.authSharedService.testAuth()

    if (!this.authSharedService.isAuth) {
        return this.router.parseUrl('log-in')
    } else {
        return true
    }
  }
}