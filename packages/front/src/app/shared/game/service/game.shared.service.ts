import { Injectable } from '@angular/core'
import { HandlerSocketLinkModel, ReceiverLinkSocketModel, SenderLinkSocketModel } from 'common'

import { SessionSharedService } from '../../session/service/session.shared.service'
import { SocketSharedService } from '../../socket/service/socket.shared.service'

@Injectable({
    providedIn: 'root'
})
export class GameSharedService {
    private _inGame: boolean = false
    private _gameId?: string

    private _handler?: HandlerSocketLinkModel

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

    public get handler(): HandlerSocketLinkModel | undefined {
        return this._handler
    }

    private set handler(value: HandlerSocketLinkModel | undefined) {
        this._handler = value
    }

    public async checkStatus(): Promise<void> {
        const testSenderLink: SenderLinkSocketModel<void>
            = await this.socketSharedService.registerSender('/game', 'check')
        const testReceiverLink: ReceiverLinkSocketModel<string>
            = await this.socketSharedService.registerReceiver('/game', 'check')
        const testErrorLink: ReceiverLinkSocketModel<any>
            = await this.socketSharedService.registerReceiver('/game', 'check')

        return new Promise((resolve: (value: void) => void, reject: (error: any) => void) => {
            testReceiverLink.subscribe((gameId: string) => {
                if (gameId === '') {
                    this.reset()
                } else if (gameId === this.gameId) {
                    this.reset()

                    this.joinGame(gameId)
                }

                resolve()

                testReceiverLink.unsubscribe()
                testErrorLink.unsubscribe()
            })

            testErrorLink.subscribe((error: any) => {
                reject(error)

                testReceiverLink.unsubscribe()
                testErrorLink.unsubscribe()
            })

            testSenderLink.emit()
        })
    }

    public joinGame(gameId: string): boolean {
        if (this.gameId === gameId) return true
        if (this.inGame) return false

        this.inGame = true
        this.gameId = gameId
        // #achan
        //this.handler = new HandlerSocketLinkModel('', 1)

        return true
    }

    public reset(): void {
        this.gameId = undefined
        this.inGame = false

        if (this.handler !== undefined) delete this.handler
    }

    public async registerSender<T>(namespace: string, event: string): Promise<SenderLinkSocketModel<T> | null> {
        if (this.handler === undefined) return null

        await this.sessionSharedService.refreshSession()

        return this.handler.registerSender<T>(namespace, event)
    }

    public async registerReceiver<T>(namespace: string, event: string): Promise<ReceiverLinkSocketModel<T> | null> {
        if (this.handler === undefined) return null

        await this.sessionSharedService.refreshSession()

        return this.handler.registerReceiver<T>(namespace, event)
    }
}
