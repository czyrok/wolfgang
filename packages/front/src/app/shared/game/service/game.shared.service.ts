import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { HandlerLinkSocketInterface, HandlerSocketLinkModel, ReceiverLinkSocketModel, SenderLinkSocketModel } from 'common'

import { DisplayAlertSharedService } from '../../alert/display/service/display.alert.shared.service'
import { SessionSharedService } from '../../session/service/session.shared.service'
import { SocketSharedService } from '../../socket/service/socket.shared.service'

import { DisplayAlertSharedInterface } from '../../alert/display/interface/display.alert.shared.interface'

@Injectable({
    providedIn: 'root'
})
/**
 * @classdesc Gère les parties
 * @implements HandlerLinkSocketInterface
 */
export class GameSharedService implements HandlerLinkSocketInterface {
    // #achan
    private _socketHandler?: HandlerSocketLinkModel

    private _inGame: boolean = false
    private _gameId?: string
    private _alreadyInGameAlert?: DisplayAlertSharedInterface

    private _currentGameId?: string

    /**
     * @param router Permet de rediriger
     * @param displayAlertSharedService Permet d'afficher des alertes
     * @param sessionSharedService La session de l'utilisateur
     * @param socketSharedService Service de socket
     */
    public constructor(
        private router: Router,
        private displayAlertSharedService: DisplayAlertSharedService,
        private sessionSharedService: SessionSharedService,
        private socketSharedService: SocketSharedService
    ) { }

    /**
     * @returns Renvoie le gestionnaire de socket
     */
    private get socketHandler(): HandlerSocketLinkModel | undefined {
        return this._socketHandler
    }

    /**
     * Modifie le gestionnaire de socket
     * @param value Valeur à assigner
     */
    private set socketHandler(value: HandlerSocketLinkModel | undefined) {
        this._socketHandler = value
    }

    /**
     * @returns Renvoie l'état d'une partie, vrai si elle a commencé sinon faux
     */
    public get inGame(): boolean {
        return this._inGame
    }

    /**
     * Modifie l'état d'une partie
     * @param value Valeur à assigner
     */
    private set inGame(value: boolean) {
        this._inGame = value
    }

    /**
     * @returns Renvoie l'ID d'une partie
     */
    public get gameId(): string | undefined {
        return this._gameId
    }

    /**
     * Assigne l'ID d'une partie
     * @param Valeur à assigner
     */
    private set gameId(value: string | undefined) {
        this._gameId = value
    }

    /**
     * @returns Renvoie une alerte "déja dans une partie"
     */
    public get alreadyInGameAlert(): DisplayAlertSharedInterface | undefined {
        return this._alreadyInGameAlert
    }

    /**
     * Assigne l'affichage de l'alerte
     * @param Valeur à assigner
     */
    private set alreadyInGameAlert(value: DisplayAlertSharedInterface | undefined) {
        this._alreadyInGameAlert = value
    }

    /**
     * @returns Renvoie l'ID de la partie en cour
     */
    public get currentGameId(): string | undefined {
        return this._currentGameId
    }

    /**
     * Assigne l'ID de la partie en cour
     * @param Valeur à assigner
     */
    private set currentGameId(value: string | undefined) {
        this._currentGameId = value
    }

    /**
     * @async Vérifie si l'utilisateur est dans une partie ou assigne une partie
     * @returns
     */
    public async checkStatus(): Promise<void> {
        const testSenderLink: SenderLinkSocketModel<void>
            = await this.socketSharedService.registerSender('/game', 'checkUserGame')
        const testReceiverLink: ReceiverLinkSocketModel<string>
            = await this.socketSharedService.registerReceiver('/game', 'checkUserGame')
        const testErrorLink: ReceiverLinkSocketModel<any>
            = await this.socketSharedService.registerReceiver('/game', 'checkUserGame-failed')

        return new Promise((resolve: (value: void) => void, reject: (error: any) => void) => {
            testReceiverLink.subscribe((gameId: string) => {
                testReceiverLink.unsubscribe()
                testErrorLink.unsubscribe()

                if (gameId === '') {
                    this.inGame = false
                    this.gameId = undefined

                    resolve()
                } else {
                    this.inGame = true

                    if (this.gameId !== gameId) {
                        this.gameId = gameId

                        this.displayJoinYourGameAlert()
                    }

                    resolve()
                }
            })

            testErrorLink.subscribe((error: any) => {
                testReceiverLink.unsubscribe()
                testErrorLink.unsubscribe()

                reject(error)
            })

            testSenderLink.emit()
        })
    }

    /**
     *
     * @param gameId ID de la partie
     * @returns Renvoie vrai si la partie a été rejointe sinon faux
     */
    public async joinGame(gameId: string): Promise<boolean> {
        if (this.currentGameId === gameId) return true

        if (!(await this.checkParty(gameId))) return false

        this.currentGameId = gameId

        //await this.sessionSharedService.refreshSession()

        this.getSocketHandler().socketManager.connect()

        return true
    }

    /**
     * Permet de quiter une partie
     * @returns
     */
    public async quitParty(): Promise<void> {
        this.currentGameId = undefined

        const leaveReceiverLink: ReceiverLinkSocketModel<boolean> = await this.registerGameReceiver('', 'leave')
        const leaveSenderLink: SenderLinkSocketModel<void> = await this.registerGameSender('', 'leave')

        return new Promise((resolve: (value: void) => void) => {
            leaveReceiverLink.subscribe((test: boolean) => {
                if (test) {
                    this.inGame = false
                    this.gameId = undefined
                }

                this.displayJoinYourGameAlert()

                this.socketHandler = undefined

                resolve()
            })

            leaveSenderLink.emit()
        })
    }

    /**
     *
     * @returns
     */
    public async joinGameAsPlayer(): Promise<boolean> {
        if (!this.currentGameId) return false

        const test: boolean = await this.joinGame(this.currentGameId)

        if (!test) return false

        if (this.inGame && this.gameId !== this.currentGameId) return false

        this.closeJoinYourGameAlert()

        const joinReceiverLink: ReceiverLinkSocketModel<boolean> = await this.registerGameReceiver('', 'join'),
            joinSenderLink: SenderLinkSocketModel<void> = await this.registerGameSender('', 'join')

        return new Promise((resolve: (value: boolean) => void) => {
            joinReceiverLink.subscribe((test: boolean) => {
                joinReceiverLink.unsubscribe()

                if (test) {
                    this.inGame = true
                    this.gameId = this.currentGameId
                }

                resolve(test)
            })

            joinSenderLink.emit()
        })
    }

    private async checkParty(gameId: string): Promise<boolean> {
        const testSenderLink: SenderLinkSocketModel<string>
            = await this.socketSharedService.registerSender('/game', 'check')
        const testReceiverLink: ReceiverLinkSocketModel<boolean>
            = await this.socketSharedService.registerReceiver('/game', 'check')

        return new Promise((resolve: (value: boolean) => void, reject: (error: any) => void) => {
            testReceiverLink.subscribe((test: boolean) => {
                testReceiverLink.unsubscribe()

                resolve(test)
            })

            testSenderLink.emit(gameId)
        })
    }

    /**
     * Permet l'affichage de l'alerte "déja en partie"
     */
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

    /**
     * Permet de fermer l'alerte "déja en partie"
     */
    public closeJoinYourGameAlert(): void {
        this.alreadyInGameAlert?.componentRef?.instance.click()
        this.alreadyInGameAlert = undefined
    }

    /**
     *
     * @param namespace
     * @param eventType
     * @returns
     */
    async registerGameSender<T>(namespace: string, eventType: string): Promise<SenderLinkSocketModel<T>> {
        return await this.registerSender(`/game/${this.currentGameId}${namespace}`, eventType)
    }

    /**
     *
     * @param namespace
     * @param event
     * @returns
     */
    async registerSender<T>(namespace: string, event: string): Promise<SenderLinkSocketModel<T>> {
        //await this.sessionSharedService.refreshSession()

        return this.getSocketHandler().registerSender<T>(namespace, event)
    }

    /**
     *
     * @param namespace
     * @param eventType
     * @returns
     */
    async registerGameReceiver<T>(namespace: string, eventType: string): Promise<ReceiverLinkSocketModel<T>> {
        return await this.registerReceiver(`/game/${this.currentGameId}${namespace}`, eventType)
    }

    /**
     *
     * @param namespace
     * @param event
     * @returns
     */
    async registerReceiver<T>(namespace: string, event: string): Promise<ReceiverLinkSocketModel<T>> {
        //await this.sessionSharedService.refreshSession()

        return this.getSocketHandler().registerReceiver<T>(namespace, event)
    }

    /**
     *
     * @returns Renvoie le gestionnaire de socket
     */
    public getSocketHandler(): HandlerSocketLinkModel {
        if (!this.socketHandler)
            this.socketHandler = new HandlerSocketLinkModel('http://localhost', 5501)

        return this.socketHandler
    }
}
