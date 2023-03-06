import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router'

import { AuthSharedService } from 'src/app/shared/auth/service/auth.shared.service'
import { SocketSharedService } from 'src/app/shared/socket/service/socket.shared.service'
import { DisplayAlertSharedService } from 'src/app/shared/alert/display/service/display.alert.shared.service'

@Injectable()
export class ProfileMainViewGuard implements CanActivate {
    constructor(
        private router: Router,
        private authSharedService: AuthSharedService,
        private socketSharedService: SocketSharedService,
        private displayAlertSharedService: DisplayAlertSharedService
    ) { }

    async canActivate(route: ActivatedRouteSnapshot): Promise<boolean | UrlTree> {            
        if (!route.firstChild) return this.router.parseUrl(`/game/profile/${this.authSharedService.username}`)

        const username: string | undefined = route.firstChild.params['username']

        if (!username) return this.router.parseUrl(`/game/profile/${this.authSharedService.username}`)

        const check: boolean = await this.socketSharedService.check<string>('/game/profile', 'check', username)

        if (!check) {
            this.displayAlertSharedService.emitWarning('Cet utilisateur n\'existe pas')

            return this.router.parseUrl('/game')
        }

        return true
    }
}