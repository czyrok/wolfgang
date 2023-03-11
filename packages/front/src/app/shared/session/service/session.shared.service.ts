import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { CookieService } from 'ngx-cookie-service'

import { environment } from 'src/environments/environment'

import { DisplayAlertSharedService } from '../../alert/display/service/display.alert.shared.service'

@Injectable({
    providedIn: 'root'
})
/**
 * @classdesc Gère les services des sessions
 */
export class SessionSharedService {

  /**
   * @param httpClient Lien du client HTTP
   * @param cookieService Service de gestion des cookies
   * @param displayAlertSharedService Service d'affichage d'une allerte
   */
    public constructor(
        private httpClient: HttpClient,
        private cookieService: CookieService,
        private displayAlertSharedService: DisplayAlertSharedService
    ) { }

    /**
     * Permet d'actualiser une session
     * @returns une promesse de la requette HTTP
     */
    public refreshSession(): Promise<void> {
        return new Promise((resolve: (value: void) => void) => {
            if (!this.cookieService.check(environment.SESSION_COOKIE_NAME)) {
                this.httpClient.get(environment.PROTOCOL + '://' + environment.MAIN_URL + ':' + environment.MAIN_PORT, {
                    withCredentials: true
                }).subscribe(
                    {
                        next: () => {
                            resolve()
                        },
 /*                        error: (error: Error) => {
                            resolve()

                            this.displayAlertSharedService.emitDanger(error.message)
                        } */
                    }
                )
            }
        })
    }
}
