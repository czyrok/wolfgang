import { Socket, Namespace } from 'socket.io'
import { instanceToPlain } from 'class-transformer'
import { OnMessage, EmitOnSuccess, MessageBody, SocketController, ConnectedSocket } from 'ts-socket.io-controller'
import { StateGameModel, GameModel } from 'common'

@SocketController({
    namespace: '/game',
    init: (io: Namespace) => { 
        let game: GameModel = GameModel.instance

        game.onStateChange((state: StateGameModel) => {
            io.emit('state', instanceToPlain(state))
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
    join(@MessageBody() player: string, @ConnectedSocket() socket: Socket) {        
        let game: GameModel = GameModel.instance

        game.newPlayer(player, socket.id)
    }
}