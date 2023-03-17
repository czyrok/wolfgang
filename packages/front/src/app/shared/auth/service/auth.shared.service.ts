import { Injectable } from '@angular/core'
import { CookieService } from 'ngx-cookie-service'
import { LinkNamespaceSocketModel } from 'common'

import { environment } from 'src/environments/environment'

import { SessionSharedService } from '../../session/service/session.shared.service'
import { SocketSharedService } from '../../socket/service/socket.shared.service'

@Injectable({
  providedIn: 'root'
})
/**
 * Gère l'authentification de l'utilisateur
 */
export class AuthSharedService {
  private _isAuth: boolean = false
  private _username: string | undefined = undefined
  private _scopeAccess: Array<string> = new Array

  /**
   * @param cookieService Service permettant de gérer les cookies
   * @param sessionSharedService Service permettant de gérer la session
   * @param socketSharedService Service permettant de gérer les sockets
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
   * Permet de savoir si l'utilisateur est connecté ou non
   * @returns Vrai s'il l'est sinon faux
   */
  public get isAuth(): boolean {
    return this._isAuth
  }

  /**
   * Assigne le nom de l'utilisateur connecté
   * @param value Valeur à assigner
   */
  private set username(value: string | undefined) {
    this._username = value
  }

  /**
   * Renvoie le pseudo de l'utilisateur connecté
   * @returns Le pseudo
   */
  public get username(): string | undefined {
    return this._username
  }

  /**
   * Définit les accès de l'utilisateur connecté
   * @param value La liste des accès
   */
  private set scopeAccess(value: Array<string>) {
    this._scopeAccess = value
  }

  /**
   * Renvoie la liste des accès de l'utilisateur connecté
   * @returns La liste des accès
   */
  public get scopeAccess(): Array<string> {
    return this._scopeAccess
  }

  /**
   * Assigne le jeton d'authentification de l'utilisateur connecté
   * @param token Le jeton d'authentification
   */
  public async setToken(token: string): Promise<void> {
    // #achan secure
    this.cookieService.set(environment.JWT_COOKIE_NAME, token, environment.JWT_COOKIE_DURATION / 60 / 60 / 24, '/', undefined, false, 'Lax')

    this.socketSharedService.socketManager.close()
    this.socketSharedService.socketManager.connect()

    await this.testAuth()
  }

  /**
   * Étape intermédiaire avant de vérifier si le jeton de l'utilisateur est toujours valide
   */
  public async testAuth(): Promise<void> {
    if (!this.cookieService.check(environment.JWT_COOKIE_NAME)) return

    this.disconnect()

    await this.sessionSharedService.refreshSession()
    await this.doAuth()
  }

  /**
   * Fais la vérification du jeton d'authentification de l'utilisateur
   */
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

  /**
   * Déclenche la déconnexion de l'utilisateur
   */
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

  /**
   * Déclenche la connexion de l'utilisateur
   * @param username Pseudo de l'utilisateur
   */
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

  /**
   * Réinitialise les variables associées à l'utilisateur
   */
  private disconnect(): void {
    this.isAuth = false
    this.username = undefined
    this.scopeAccess.splice(0, this.scopeAccess.length)
  }
}
