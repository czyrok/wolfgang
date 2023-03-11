import { Injectable } from '@angular/core'
import { CanActivate, Router, UrlTree } from '@angular/router'

import { AuthSharedService } from '../../service/auth.shared.service'

@Injectable({
  providedIn: 'root'
})
export class AdminAuthSharedGuard implements CanActivate {
  constructor(
    private router: Router,
    private authSharedService: AuthSharedService
  ) { }

  async canActivate(): Promise<boolean | UrlTree> {
    await this.authSharedService.testAuth()

    for (const scope of this.authSharedService.scopeAccess) {
      if (scope === 'admin') return true
    }

    return this.router.parseUrl('/')
  }
}