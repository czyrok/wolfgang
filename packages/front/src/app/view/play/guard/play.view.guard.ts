import { Injectable } from '@angular/core'
import { CanActivate, Router } from '@angular/router'

import { UserService } from 'src/app/user/service/user.service'

@Injectable()
export class PlayViewGuard implements CanActivate {
  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  canActivate() {
    if (this.userService.username === undefined) {
      return this.router.parseUrl('home/username')
    } else {
      return true
    }
  }
}