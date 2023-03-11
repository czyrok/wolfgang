import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router'

import { SocketSharedService } from 'src/app/shared/socket/service/socket.shared.service'
import { DisplayAlertSharedService } from 'src/app/shared/alert/display/service/display.alert.shared.service'

@Injectable()
export class ViewReportManagingViewGuard implements CanActivate {
    constructor(
        private router: Router,
        private socketSharedService: SocketSharedService,
        private displayAlertSharedService: DisplayAlertSharedService
    ) { }

    async canActivate(route: ActivatedRouteSnapshot): Promise<boolean | UrlTree> {
        if (!route.firstChild) return this.router.parseUrl('/managing/report')

        const reportId: string | undefined = route.firstChild.params['report_id']

        if (!reportId) return this.router.parseUrl('/managing/report')

        const check: boolean = await this.socketSharedService.check<string>('/managing/report', 'check', reportId)

        if (!check) {
            this.displayAlertSharedService.emitWarning('Ce signalement n\'existe pas')

            return this.router.parseUrl('/managing/report')
        }

        return true
    }
}