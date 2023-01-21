import { EnvUtil, HandlerSocketLinkModel, ReceiverLinkSocketModel, StateGameModel, VarEnvEnum } from 'common'
import { Socket } from 'socket.io-client'

export class CheckConnectionGameModel {
    private _connection: HandlerSocketLinkModel
        = new HandlerSocketLinkModel(EnvUtil.get(VarEnvEnum.GAME_URL), parseInt(EnvUtil.get(VarEnvEnum.GAME_PORT)))

    private _receiverLink: ReceiverLinkSocketModel<StateGameModel>

    public constructor(
        private _gameId: string
    ) {
        this._receiverLink = this.connection.registerReceiver(`/game/${this.gameId}`, 'state')
    }

    private get connection(): HandlerSocketLinkModel {
        return this._connection
    }

    private get receiverLink(): ReceiverLinkSocketModel<StateGameModel> {
        return this._receiverLink
    }

    private get gameId(): string {
        return this._gameId
    }

    public checkGame(): Promise<boolean> {
        const namespaceSocket: Socket | undefined = this.connection.getSocket(`/game/${this.gameId}`)

        return new Promise((resolve: (value: boolean) => void, reject: (error: any) => void) => {
            if (namespaceSocket) {
                namespaceSocket.on('connect_error', _ => {
                    resolve(false)
                })

                this.receiverLink.subscribe((state: StateGameModel) => {
                    if (state.isFinished) {
                        resolve(false)
                    } else {
                        resolve(true)
                    }
                })
            } else {
                resolve(false)
            }
        })
    }

    public destroy(): void {
        this.receiverLink.unsubscribe()
    }
}