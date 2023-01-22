import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router'

import { GameSharedService } from '../../../shared/game/service/game.shared.service'
import { DisplayAlertSharedService } from '../../../shared/alert/display/service/display.alert.shared.service'

@Injectable()
export class PlayViewGuard implements CanActivate {
    constructor(
        private router: Router,
        private gameSharedService: GameSharedService,
        private DisplayAlertSharedService: DisplayAlertSharedService
    ) { }

    async canActivate(route: ActivatedRouteSnapshot): Promise<boolean | UrlTree> {
        await this.gameSharedService.checkStatus()

        if (this.gameSharedService.inGame && !route.firstChild) return this.router.parseUrl(`/game/profile/${this.gameSharedService.gameId}`)
        if (!route.firstChild) return this.router.parseUrl('/game/currently')

        const gameId: string | undefined = route.firstChild.params['game_id']
        
        if (!gameId) return this.router.parseUrl('/game/currently')

        console.log(this.gameSharedService.gameId)

        if (await this.gameSharedService.joinGame(gameId)) return true

        this.DisplayAlertSharedService.emitWarning('Vous ne pouvez pas rejoindre cette partie')

        return this.router.parseUrl('/game/currently')
    }
}