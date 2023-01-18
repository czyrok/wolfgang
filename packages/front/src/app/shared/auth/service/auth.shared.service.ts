import { Injectable } from '@angular/core'
import { CookieService } from 'ngx-cookie-service'
import { ReceiverLinkSocketModel, SenderLinkSocketModel } from 'common'

import { SessionSharedService } from '../../session/service/session.shared.service'
import { SocketSharedService } from '../../socket/service/socket.shared.service'

@Injectable({
  providedIn: 'root'
})
export class AuthSharedService {
  private _isAuth: boolean = false
  private _username: string | undefined = undefined

  public constructor(
    private cookieService: CookieService,
    private sessionSharedService: SessionSharedService,
    private socketSharedService: SocketSharedService
  ) { }

  private set isAuth(value: boolean) {
    this._isAuth = value
  }

  public get isAuth(): boolean {
    return this._isAuth
  }

  private set username(value: string | undefined) {
    this._username = value
  }

  public get username(): string | undefined {
    return this._username
  }

  public async setToken(token: string): Promise<void> {
    // #achan secure, et utiliser env
    this.cookieService.set('token', token, 518400000, '/', undefined, false, 'Lax')

    await this.testAuth()
  }

  public async testAuth(): Promise<void> {
    await this.sessionSharedService.refreshSession()

    this.isAuth = false
    this.username = undefined

    // #achan
    if (!this.cookieService.check('token')) return

    const testLink: SenderLinkSocketModel<void> = await this.socketSharedService.registerSender('/test/auth', 'trigger')
    const resTestLink: ReceiverLinkSocketModel<string> = await this.socketSharedService.registerReceiver('/test/auth', 'trigger')

    resTestLink.subscribe((username: string) => {
      this.isAuth = true
      this.username = username

      resTestLink.unsubscribe()
    })

    testLink.emit()
  }
}
