import { Socket } from 'socket.io-client'
import { EnvUtil, HandlerSocketLinkModel, ReceiverLinkSocketModel, StateGameModel, VarEnvEnum } from 'common'

export class CheckConnectionGameModel {
    private _connection: HandlerSocketLinkModel
        = new HandlerSocketLinkModel(EnvUtil.get(VarEnvEnum.GAME_URL), parseInt(EnvUtil.get(VarEnvEnum.GAME_PORT)))

    private _receiverLink: ReceiverLinkSocketModel<StateGameModel>

    public constructor(
        private _gameId: string
    ) {
        this._receiverLink = this.connection.registerReceiver(`/test/${this.gameId}`, 'state')
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
        console.log(this.gameId)
        const namespaceSocket: Socket | undefined = this.connection.getNamespace(`/test/${this.gameId}`)

        return new Promise((resolve: (value: boolean) => void, reject: (error: any) => void) => {
            if (namespaceSocket) {
                namespaceSocket.on('connect_error', _ => {
                    resolve(false)
                    
                    console.log('sltt')

                    this.receiverLink.unsubscribe()
                })

                this.receiverLink.subscribe((state: StateGameModel) => {
                    if (state.isFinished) {
                        console.log('sltt2')
                        resolve(false)
                    } else {
                        console.log('sltt3')
                        resolve(true)
                    }

                    this.receiverLink.unsubscribe()
                })

                // #achan problème si on utilise plusieurs fois ici
                this.connection.socketManager.connect()
            } else {
                console.log('sltt4')
                resolve(false)
            }
        })
    }
}