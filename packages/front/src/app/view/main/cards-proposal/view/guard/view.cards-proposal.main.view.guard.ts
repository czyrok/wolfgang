import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router'

import { SocketSharedService } from 'src/app/shared/socket/service/socket.shared.service'
import { DisplayAlertSharedService } from 'src/app/shared/alert/display/service/display.alert.shared.service'

@Injectable()
export class ViewCardsProposalMainViewGuard implements CanActivate {
    constructor(
        private router: Router,
        private socketSharedService: SocketSharedService,
        private displayAlertSharedService: DisplayAlertSharedService
    ) { }

    async canActivate(route: ActivatedRouteSnapshot): Promise<boolean | UrlTree> {
        if (!route.firstChild) return this.router.parseUrl('/game/cards-proposal')

        const cardProposalId: string | undefined = route.firstChild.params['card_proposal_id']
        
        if (!cardProposalId) return this.router.parseUrl('/game/cards-proposal')

        const check: boolean = await this.socketSharedService.check<undefined>('/game/cards-proposal/view/' + cardProposalId, 'check', undefined)

        if (!check) {
            this.displayAlertSharedService.emitWarning('Cette proposition de carte n\'existe pas')

            return this.router.parseUrl('/game/cards-proposal')
        }

        return true
    }
}