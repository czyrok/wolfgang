import { Injectable } from '@angular/core'
import { HandlerEventLinkSocketModel, HandlerLinkSocketInterface, HandlerSocketLinkModel, ReceiverLinkSocketModel, SenderLinkSocketModel } from 'common'

import { SessionSharedService } from '../../session/service/session.shared.service'
import { SocketSharedService } from '../../socket/service/socket.shared.service'

@Injectable({
    providedIn: 'root'
})
export class GameSharedService {
    private _inGame: boolean = false
    private _gameId?: string

    private _socketHandler?: HandlerSocketLinkModel
    private _eventHandler?: HandlerEventLinkSocketModel

    public constructor(
        private sessionSharedService: SessionSharedService,
        private socketSharedService: SocketSharedService
    ) { }

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

    private get socketHandler(): HandlerSocketLinkModel | undefined {
        return this._socketHandler
    }

    private set socketHandler(value: HandlerSocketLinkModel | undefined) {
        this._socketHandler = value
    }

    public get eventHandler(): HandlerEventLinkSocketModel | undefined {
        return this._eventHandler
    }

    private set eventHandler(value: HandlerEventLinkSocketModel | undefined) {
        this._eventHandler = value
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
                if (gameId === '') {
                    this.reset()
                } else {
                    this.reset()

                    this.joinGame(gameId)
                }

                testReceiverLink.unsubscribe()
                testErrorLink.unsubscribe()

                resolve()
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
        if (this.gameId === gameId) return true
        if (this.inGame) return false

        console.log('rr1')

        if (!(await this.checkParty(gameId))) return false

        console.log('rr')

        this.inGame = true
        this.gameId = gameId
        // #achan
        this.socketHandler = new HandlerSocketLinkModel('http://localhost', 5501)

        await this.sessionSharedService.refreshSession()

        this.socketHandler.socketManager.connect()

        const socketHandlerTemp: HandlerSocketLinkModel = this.socketHandler
        const sessionSharedServiceTemp: SessionSharedService = this.sessionSharedService

        const handlerSocketReplacement: HandlerLinkSocketInterface = {
            async registerSender<T>(namespace: string, eventType: string): Promise<SenderLinkSocketModel<T> | null> {
                if (socketHandlerTemp) {
                    await sessionSharedServiceTemp.refreshSession()

                    return socketHandlerTemp.registerSender<T>(namespace, eventType)
                }

                return null
            },
            async registerReceiver<T>(namespace: string, eventType: string): Promise<ReceiverLinkSocketModel<T> | null> {
                if (socketHandlerTemp) {
                    await sessionSharedServiceTemp.refreshSession()

                    return socketHandlerTemp.registerReceiver<T>(namespace, eventType)
                }

                return null
            }
        }

        this.eventHandler = new HandlerEventLinkSocketModel(`/game/${gameId}`, handlerSocketReplacement)

        return true
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

    public reset(): void {
        this.gameId = undefined
        this.inGame = false

        if (this.socketHandler !== undefined) this.socketHandler = undefined

        if (this.eventHandler !== undefined) {
            this.eventHandler.unsubscribe()

            this.eventHandler = undefined
        }
    }
}
