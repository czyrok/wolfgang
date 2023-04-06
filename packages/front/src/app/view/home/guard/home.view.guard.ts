import { Injectable } from '@angular/core'
import { CanActivate, Router, UrlTree } from '@angular/router'

import { AuthSharedService } from 'src/app/shared/auth/service/auth.shared.service'

@Injectable()
export class HomeViewGuard implements CanActivate {
    constructor(
        private router: Router,
        private authSharedService: AuthSharedService
    ) { }

    async canActivate(): Promise<boolean | UrlTree> {
        await this.authSharedService.testAuth()

        if (this.authSharedService.isAuth) return this.router.parseUrl('/')

        return true
    }
}