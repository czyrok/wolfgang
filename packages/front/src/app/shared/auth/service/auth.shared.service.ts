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
    this.cookieService.set('token', token, 6, '/', undefined, false, 'Lax')

    await this.testAuth()
  }

  public async testAuth(): Promise<void> {
    // #achan use env
    if (!this.cookieService.check('token')) return

    this.disconnect()

    await this.sessionSharedService.refreshSession()
    await this.doAuth()
  }

  private async doAuth(): Promise<void> {
    const testLink: SenderLinkSocketModel<void> = await this.socketSharedService.registerSender('/auth', 'test')
    const resTestLink: ReceiverLinkSocketModel<string> = await this.socketSharedService.registerReceiver('/auth', 'test')

    return new Promise((resolve: (value: void) => void) => {
      resTestLink.subscribe((username: string) => {
        this.connect(username)

        resolve()

        resTestLink.unsubscribe()
      })

      testLink.emit()
    })
  }

  public async logOut(): Promise<void> {
    const logOutSenderLink: SenderLinkSocketModel<void> = await this.socketSharedService.registerSender('/auth', 'logOut')
    const logOutReceiverLink: ReceiverLinkSocketModel<void> = await this.socketSharedService.registerReceiver('/auth', 'logOut')

    return new Promise((resolve: (value: void) => void) => {
      logOutReceiverLink.subscribe(() => {
        this.disconnect()
        // #achan
        this.cookieService.delete('token')

        resolve()

        logOutReceiverLink.unsubscribe()
      })

      logOutSenderLink.emit()
    })
  }

  private connect(username: string): void {
    this.isAuth = true
    this.username = username
  }

  private disconnect(): void {
    this.isAuth = false
    this.username = undefined
  }
}
