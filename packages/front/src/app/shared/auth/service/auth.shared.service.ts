import { Injectable } from '@angular/core'
import { CookieService } from 'ngx-cookie-service'
import { LinkNamespaceSocketModel } from 'common'

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

    this.socketSharedService.socketManager.close()
    this.socketSharedService.socketManager.connect()

    await this.testAuth()
  }

  public async testAuth(): Promise<void> {
    if (!this.cookieService.check(environment.JWT_COOKIE_NAME)) return

    this.disconnect()

    await this.sessionSharedService.refreshSession()
    await this.doAuth()
  }

  private async doAuth(): Promise<void> {
    const testLink: LinkNamespaceSocketModel<void, string> = await this.socketSharedService.buildLink<void, string>('/auth', 'test')

    return new Promise((resolve: () => void, reject: () => void) => {
      testLink.on(async (username: string) => {
        testLink.destroy()

        await this.connect(username)

        resolve()
      })

      testLink.onFail(() => {
        testLink.destroy()

        reject()
      })

      testLink.emit()
    })
  }

  public async logOut(): Promise<void> {
    const logOutLink: LinkNamespaceSocketModel<void, void> = await this.socketSharedService.buildLink('/auth', 'logOut')

    return new Promise((resolve: (value: void) => void) => {
      logOutLink.on(() => {
        logOutLink.destroy()

        this.disconnect()

        // #aret
        // this.socketSharedService.manager.getNamespace('/auth').disconnect()

        // #achan
        this.cookieService.delete(environment.JWT_COOKIE_NAME, '/', undefined, false, 'Lax')

        resolve()
      })

      logOutLink.emit()
    })
  }

  private async connect(username: string): Promise<void> {
    this.isAuth = true
    this.username = username

    const scopeLink: LinkNamespaceSocketModel<void, Array<string>> = await this.socketSharedService.buildLink('/auth', 'getScope')

    return new Promise((resolve: (value: void) => void) => {
      scopeLink.on((scopeAccess: Array<string>) => {
        scopeLink.destroy()

        resolve()

        this.scopeAccess = scopeAccess
      })

      scopeLink.emit()
    })
  }

  private disconnect(): void {
    this.isAuth = false
    this.username = undefined
    this.scopeAccess.splice(0, this.scopeAccess.length)
  }
}
