import { Socket, Namespace } from 'socket.io'
import { OnMessage, EmitOnSuccess, MessageBody, SocketController, ConnectedSocket } from 'ts-socket.io-controller'
import { StateGameModel, GameModel } from 'common'

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

        console.log('STATE_23')

        return game.state
    }

    @OnMessage()
    join(@MessageBody() player: string, @ConnectedSocket() socket: Socket) {
        console.log('JOIN_32')
        
        let game: GameModel = GameModel.instance

        game.addPlayer(player, socket.id)
    }
}