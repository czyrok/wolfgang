import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { CookieService } from 'ngx-cookie-service'

import { DisplayAlertSharedService } from '../../alert/display/service/display.alert.shared.service'

@Injectable({
    providedIn: 'root'
})
export class SessionSharedService {
    public constructor(
        private httpClient: HttpClient,
        private cookieService: CookieService,
        private displayAlertSharedService: DisplayAlertSharedService
    ) { }

    public refreshSession(): Promise<void> {
        return new Promise((resolve: (value: void) => void) => {
            if (!this.cookieService.get('sid')) {
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
