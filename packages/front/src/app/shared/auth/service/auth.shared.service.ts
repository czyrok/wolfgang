import { Injectable } from '@angular/core'
import { CookieService } from 'ngx-cookie-service'
import { ReceiverLinkSocketModel, SenderLinkSocketModel } from 'common'

import { environment } from 'src/environments/environment'

import { SessionSharedService } from '../../session/service/session.shared.service'
import { SocketSharedService } from '../../socket/service/socket.shared.service'

@Injectable({
  providedIn: 'root'
})
export class AuthSharedService {
  private _isAuth: boolean = false
  private _username: string | undefined = undefined
  private _scopeAccess: Array<string> = new Array

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

  private set scopeAccess(value: Array<string>) {
    this._scopeAccess = value
  }

  public get scopeAccess(): Array<string> {
    return this._scopeAccess
  }

  public async setToken(token: string): Promise<void> {
    // #achan secure
    this.cookieService.set(environment.JWT_COOKIE_NAME, token, environment.JWT_COOKIE_DURATION / 60 / 60 / 24, '/', undefined, false, 'Lax')

    this.socketSharedService.handler.socketManager.engine.close()
    this.socketSharedService.handler.socketManager.connect()

    await this.testAuth()
  }

  public async testAuth(): Promise<void> {
    if (!this.cookieService.check(environment.JWT_COOKIE_NAME)) return

    this.disconnect()

    await this.sessionSharedService.refreshSession()
    await this.doAuth()
  }

  private async doAuth(): Promise<void> {
    this.socketSharedService.handler.getNamespace('/auth').connect()

    const testSenderLink: SenderLinkSocketModel<void> = await this.socketSharedService.registerSender('/auth', 'test'),
      testReceiverLink: ReceiverLinkSocketModel<string> = await this.socketSharedService.registerReceiver('/auth', 'test'),
      testErrorLink: ReceiverLinkSocketModel<string> = await this.socketSharedService.registerReceiver('/auth', 'test')

    return new Promise((resolve: (value: void) => void) => {
      testReceiverLink.subscribe(async (username: string) => {
        testReceiverLink.unsubscribe()
        testErrorLink.unsubscribe()

        await this.connect(username)

        resolve()
      })

      testErrorLink.subscribe(() => {
        testReceiverLink.unsubscribe()
        testErrorLink.unsubscribe()
      })

      testSenderLink.emit()
    })
  }

  public async logOut(): Promise<void> {
    const logOutSenderLink: SenderLinkSocketModel<void> = await this.socketSharedService.registerSender('/auth', 'logOut'),
      logOutReceiverLink: ReceiverLinkSocketModel<void> = await this.socketSharedService.registerReceiver('/auth', 'logOut')

    return new Promise((resolve: (value: void) => void) => {
      logOutReceiverLink.subscribe(() => {
        this.disconnect()

        this.socketSharedService.handler.getNamespace('/auth').disconnect()

        // #achan
        this.cookieService.delete(environment.JWT_COOKIE_NAME, '/', undefined, false, 'Lax')

        resolve()

        logOutReceiverLink.unsubscribe()
      })

      logOutSenderLink.emit()
    })
  }

  private async connect(username: string): Promise<void> {
    this.isAuth = true
    this.username = username

    const scopeSenderLink: SenderLinkSocketModel<void> = await this.socketSharedService.registerSender('/auth', 'getScope'),
      scopeReceiverLink: ReceiverLinkSocketModel<Array<string>> = await this.socketSharedService.registerReceiver('/auth', 'getScope')

    return new Promise((resolve: (value: void) => void) => {
      scopeReceiverLink.subscribe((scopeAccess: Array<string>) => {
        scopeReceiverLink.unsubscribe()

        resolve()

        this.scopeAccess = scopeAccess

        console.log(this.scopeAccess)
      })

      scopeSenderLink.emit()
    })
  }

  private disconnect(): void {
    this.isAuth = false
    this.username = undefined
    this.scopeAccess.splice(0, this.scopeAccess.length)
  }
}
