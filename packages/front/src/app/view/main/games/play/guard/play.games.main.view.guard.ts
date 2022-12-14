import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router'

import { UserSharedService } from 'src/app/shared/user/service/user.shared.service'

@Injectable()
export class PlayGamesMainViewGuard implements CanActivate {
  constructor(
    private router: Router,
    private userSharedService: UserSharedService
  ) { }

  canActivate() {
    if (this.userSharedService.username === undefined) {
      return this.router.parseUrl('/username')
    } else {
      return true
    }
  }
}