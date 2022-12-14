import { Socket, Namespace } from 'socket.io'
import { OnMessage, EmitOnSuccess, MessageBody, SocketController } from 'ts-socket.io-controller'
import { StateGameModel } from 'common'

import { GameModel } from '../model/game.model'

@SocketController({
    namespace: '/game',
    init: (io: Namespace) => { 
        let game: GameModel = GameModel.instance

        game.onStateChange((state: StateGameModel) => {
            io.emit('state', state)
        })
    }
})
export class GameController {
    @OnMessage()
    @EmitOnSuccess()
    state() {
        let game: GameModel = GameModel.instance

        return game.state
    }

    @OnMessage()
    join(@MessageBody player: string, @ConnectedSocket() socket: Socket) {
        let game: GameModel = GameModel.instance

        game.addPlayer(player, socket.id)
    }
}