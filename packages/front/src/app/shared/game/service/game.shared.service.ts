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
export class GameSharedService implements HandlerLinkSocketInterface {
    // #achan
    private _socketHandler?: HandlerSocketLinkModel

    private _inGame: boolean = false
    private _gameId?: string
    private _alreadyInGameAlert?: DisplayAlertSharedInterface

    private _currentGameId?: string

    public constructor(
        private router: Router,
        private displayAlertSharedService: DisplayAlertSharedService,
        private sessionSharedService: SessionSharedService,
        private socketSharedService: SocketSharedService
    ) { }

    private get socketHandler(): HandlerSocketLinkModel | undefined {
        return this._socketHandler
    }

    private set socketHandler(value: HandlerSocketLinkModel | undefined) {
        this._socketHandler = value
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

    public async joinGame(gameId: string): Promise<boolean> {
        if (this.currentGameId === gameId) return true

        if (!(await this.checkParty(gameId))) return false

        this.currentGameId = gameId

        //await this.sessionSharedService.refreshSession()

        this.getSocketHandler().socketManager.connect()

        return true
    }

    public async quitParty(): Promise<void> {
        const leaveReceiverLink: ReceiverLinkSocketModel<boolean> = await this.registerGameReceiver('', 'leave'),
            leaveSenderLink: SenderLinkSocketModel<void> = await this.registerGameSender('', 'leave')

        return new Promise((resolve: (value: void) => void) => {
            leaveReceiverLink.subscribe((test: boolean) => {
                if (test) {
                    this.inGame = false
                    this.gameId = undefined
                }

                this.currentGameId = undefined
                this.socketHandler = undefined

                this.displayJoinYourGameAlert()

                resolve()
            })

            leaveSenderLink.emit()
        })
    }

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

    async registerGameSender<T>(namespace: string, eventType: string): Promise<SenderLinkSocketModel<T>> {
        return await this.registerSender(`/game/${this.currentGameId}${namespace}`, eventType)
    }

    async registerSender<T>(namespace: string, event: string): Promise<SenderLinkSocketModel<T>> {
        //await this.sessionSharedService.refreshSession()

        return this.getSocketHandler().registerSender<T>(namespace, event)
    }

    async registerGameReceiver<T>(namespace: string, eventType: string): Promise<ReceiverLinkSocketModel<T>> {
        return await this.registerReceiver(`/game/${this.currentGameId}${namespace}`, eventType)
    }

    async registerReceiver<T>(namespace: string, event: string): Promise<ReceiverLinkSocketModel<T>> {
        //await this.sessionSharedService.refreshSession()

        return this.getSocketHandler().registerReceiver<T>(namespace, event)
    }

    public getSocketHandler(): HandlerSocketLinkModel {
        if (!this.socketHandler)
            this.socketHandler = new HandlerSocketLinkModel('http://localhost', 5501)

        return this.socketHandler
    }
}
