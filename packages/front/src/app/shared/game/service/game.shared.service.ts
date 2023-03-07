import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Subject } from 'rxjs'
import { LinkNamespaceSocketModel, BuildManagerSocketInterface, AlternativeBuildManagerSocketInterface, ManagerSocketModel, NamespaceSocketModel } from 'common'

import { environment } from 'src/environments/environment'

import { SocketSharedService } from '../../socket/service/socket.shared.service'
import { SessionSharedService } from '../../session/service/session.shared.service'
import { DisplayAlertSharedService } from '../../alert/display/service/display.alert.shared.service'

import { DisplayAlertSharedInterface } from '../../alert/display/interface/display.alert.shared.interface'

@Injectable({
    providedIn: 'root'
})
export class GameSharedService implements BuildManagerSocketInterface, AlternativeBuildManagerSocketInterface {
    private _socketManager?: ManagerSocketModel
    private _socketNamespace?: NamespaceSocketModel

    private _inGame: boolean = false
    private _gameId?: string
    private _alreadyInGameAlert?: DisplayAlertSharedInterface

    private _currentGameId?: string

    private _joinEvent: Subject<void> = new Subject

    public constructor(
        private router: Router,
        private socketSharedService: SocketSharedService,
        private sessionSharedService: SessionSharedService,
        private displayAlertSharedService: DisplayAlertSharedService
    ) { }

    private set socketManager(value: ManagerSocketModel | undefined) {
        this._socketManager = value
    }

    public get socketManager(): ManagerSocketModel {
        if (!this._socketManager) {
            this._socketManager = new ManagerSocketModel(environment.GAME_URL, environment.GAME_PORT)
            this._socketManager.socketIoManager.reconnection(true)
            this._socketManager.connect()
        }

        return this._socketManager
    }

    private set socketNamespace(value: NamespaceSocketModel | undefined) {
        this._socketNamespace = value
    }

    private get socketNamespace(): NamespaceSocketModel {
        if (!this._socketNamespace)
            this._socketNamespace = this.socketManager.buildNamespace('/game/' + this.currentGameId)

        return this._socketNamespace
    }

    public get inGame(): boolean {
        return this._inGame
    }

    private set inGame(value: boolean) {
        this._inGame = value
    }

    public get gameId(): string | undefined {
        return this._gameId
    }

    private set gameId(value: string | undefined) {
        this._gameId = value
    }

    public get alreadyInGameAlert(): DisplayAlertSharedInterface | undefined {
        return this._alreadyInGameAlert
    }

    private set alreadyInGameAlert(value: DisplayAlertSharedInterface | undefined) {
        this._alreadyInGameAlert = value
    }

    public get currentGameId(): string | undefined {
        return this._currentGameId
    }

    private set currentGameId(value: string | undefined) {
        this._currentGameId = value
    }

    public get joinEvent(): Subject<void> {
        return this._joinEvent
    }

    async buildNamespace(namespaceName: string): Promise<NamespaceSocketModel> {
        await this.sessionSharedService.refreshSession()

        return this.socketNamespace.buildNamespace(namespaceName)
    }

    async buildLink<S, R, E = any>(namespaceName: string, event: string): Promise<LinkNamespaceSocketModel<S, R, E>> {
        await this.sessionSharedService.refreshSession()

        return this.socketNamespace.buildLink(namespaceName, event)
    }

    async buildBaseLink<S, R, E = any>(event: string): Promise<LinkNamespaceSocketModel<S, R, E>> {
        await this.sessionSharedService.refreshSession()

        return this.socketNamespace.buildBaseLink(event)
    }

    public async checkStatus(): Promise<void> {
        const checkUserGameLink: LinkNamespaceSocketModel<void, string> = await this.socketSharedService.buildLink('/game', 'checkUserGame')

        return new Promise((resolve: (value: void) => void, reject: (error: any) => void) => {
            checkUserGameLink.on((gameId: string) => {
                checkUserGameLink.destroy()

                if (gameId === '') {
                    this.inGame = false
                    this.gameId = undefined
                } else {
                    this.inGame = true

                    if (this.gameId !== gameId) {
                        this.gameId = gameId

                        this.displayJoinYourGameAlert()
                    }
                }

                resolve()
            })

            checkUserGameLink.onFail((error: any) => {
                checkUserGameLink.destroy()

                reject(error)
            })

            checkUserGameLink.emit()
        })
    }

    public async joinGame(gameId: string): Promise<boolean> {
        if (this.currentGameId === gameId) return true

        if (this.currentGameId) this.quitParty()

        if (!(await this.checkParty(gameId))) return false

        this.currentGameId = gameId

        this.joinEvent.next()

        return true
    }

    public quitParty(): void {
        this.inGame = false
        this.gameId = undefined
        this.currentGameId = undefined

        this.socketNamespace.destroy()
        this.socketManager.close()

        this.socketNamespace = undefined
        this.socketManager = undefined
    }

    public async joinGameAsPlayer(): Promise<boolean> {
        if (!this.currentGameId) return false

        const test: boolean = await this.joinGame(this.currentGameId)

        if (!test) return false

        if (this.inGame && this.gameId !== this.currentGameId) return false

        this.closeJoinYourGameAlert()

        const joinLink: LinkNamespaceSocketModel<void, boolean> = await this.buildBaseLink('join')

        return new Promise((resolve: (value: boolean) => void) => {
            joinLink.on((test: boolean) => {
                joinLink.destroy()

                if (test) {
                    this.inGame = true
                    this.gameId = this.currentGameId
                }

                resolve(test)
            })

            joinLink.emit()
        })
    }

    private async checkParty(gameId: string): Promise<boolean> {
        return this.socketSharedService.check<undefined>('/play/' + gameId, 'check', undefined)
    }

    public displayJoinYourGameAlert(): void {
        this.alreadyInGameAlert?.componentRef?.instance.click()
        this.alreadyInGameAlert = undefined

        if (this.inGame) {
            this.alreadyInGameAlert = this.displayAlertSharedService.emitInform('Vous êtes déjà dans une partie', undefined, false, [
                {
                    text: 'Rejoindre',
                    callback: () => {
                        this.router.navigateByUrl(`/play/${this.gameId}`)
                    }
                }
            ])
        }
    }

    public closeJoinYourGameAlert(): void {
        this.alreadyInGameAlert?.componentRef?.instance.click()
        this.alreadyInGameAlert = undefined
    }
}
