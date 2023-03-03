import { Injectable } from '@angular/core'
import { CookieService } from 'ngx-cookie-service'
import { ReceiverLinkSocketModel, SenderLinkSocketModel } from 'common'

import { SessionSharedService } from '../../session/service/session.shared.service'
import { SocketSharedService } from '../../socket/service/socket.shared.service'

@Injectable({
  providedIn: 'root'
})
/**
 * @classdesc Gère l'authentification de l'utilisateur
 */
export class AuthSharedService {
  private _isAuth: boolean = false
  private _username: string | undefined = undefined

  /**
   * @param cookieService
   * @param sessionSharedService
   * @param socketSharedService
   */
  public constructor(
    private cookieService: CookieService,
    private sessionSharedService: SessionSharedService,
    private socketSharedService: SocketSharedService
  ) { }

  /**
   * Modifie l'état de l'authentification
   * @param value Valeur à assigner
   */
  private set isAuth(value: boolean) {
    this._isAuth = value
  }

  /**
   * @returns Renvoie vraie si l'utilisateur est connecté faux sinon
   */
  public get isAuth(): boolean {
    return this._isAuth
  }

  /**
   * Modifie le nom de l'utilisateur
   * @param value Valeur à assigner
   */
  private set username(value: string | undefined) {
    this._username = value
  }

  /**
   * @returns Renvoie le nom de l'utilisateur
   */
  public get username(): string | undefined {
    return this._username
  }

  /**
   *
   * @param token
   */
  public async setToken(token: string): Promise<void> {
    // #achan secure, et utiliser env
    this.cookieService.set('token', token, 6, '/', undefined, false, 'Lax')

    this.socketSharedService.handler.socketManager.engine.close()
    this.socketSharedService.handler.socketManager.connect()

    await this.testAuth()
  }

  /**
   *
   */
  public async testAuth(): Promise<void> {
    // #achan use env
    if (!this.cookieService.check('token')) return

    this.disconnect()

    await this.sessionSharedService.refreshSession()
    await this.doAuth()
  }

  /**
   *
   * @returns
   */
  private async doAuth(): Promise<void> {
    this.socketSharedService.handler.getNamespace('/auth').connect()

    const testSenderLink: SenderLinkSocketModel<void> = await this.socketSharedService.registerSender('/auth', 'test'),
      testReceiverLink: ReceiverLinkSocketModel<string> = await this.socketSharedService.registerReceiver('/auth', 'test'),
      testErrorLink: ReceiverLinkSocketModel<string> = await this.socketSharedService.registerReceiver('/auth', 'test')

    return new Promise((resolve: (value: void) => void) => {
      testReceiverLink.subscribe((username: string) => {
        testReceiverLink.unsubscribe()
        testErrorLink.unsubscribe()

        this.connect(username)

        resolve()
      })

      testErrorLink.subscribe((error: any) => {
        testReceiverLink.unsubscribe()
        testErrorLink.unsubscribe()
      })

      testSenderLink.emit()
    })
  }

  /**
   *
   * @returns
   */
  public async logOut(): Promise<void> {
    const logOutSenderLink: SenderLinkSocketModel<void> = await this.socketSharedService.registerSender('/auth', 'logOut'),
      logOutReceiverLink: ReceiverLinkSocketModel<void> = await this.socketSharedService.registerReceiver('/auth', 'logOut')

    return new Promise((resolve: (value: void) => void) => {
      logOutReceiverLink.subscribe(() => {
        this.disconnect()

        this.socketSharedService.handler.getNamespace('/auth').disconnect()

        // #achan
        this.cookieService.delete('token', '/', undefined, false, 'Lax')

        resolve()

        logOutReceiverLink.unsubscribe()
      })

      logOutSenderLink.emit()
    })
  }

  /**
   * Définis l'utilisateur comme connecté
   * @param username Nom de l'utilisateur qui doit être connecté
   */
  private connect(username: string): void {
    this.isAuth = true
    this.username = username
  }

  /**
   * Définis l'utilisateur comme déconnecté
   */
  private disconnect(): void {
    this.isAuth = false
    this.username = undefined
  }
}
