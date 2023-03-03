import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { CookieService } from 'ngx-cookie-service'

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
            if (!this.cookieService.check('sid')) {
                this.httpClient.get('http://localhost:5500/', {
                    withCredentials: true
                }).subscribe(
                    {
                        next: () => {
                            resolve()
                        },
                        error: (error: Error) => {
                            resolve()
                            this.displayAlertSharedService.emitDanger(error.message)
                        }
                    }
                )
            }
        })
    }
}
