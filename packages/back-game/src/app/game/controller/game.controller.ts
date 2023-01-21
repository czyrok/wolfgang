import { Socket, Namespace } from 'socket.io'
import { instanceToPlain } from 'class-transformer'
import { OnMessage, EmitOnSuccess, MessageBody, SocketController, ConnectedSocket, OnConnect } from 'ts-socket.io-controller'
import { GameModel, NotFoundUserError, UserModel } from 'common'
import { Request } from 'express'
import { DocumentType } from '@typegoose/typegoose'

@SocketController({
    namespace: '/game/:id',
    init: (io: Namespace) => {
        let game: GameModel = GameModel.instance

        game.onStateChange((game: GameModel) => {
            io.emit('state', instanceToPlain(game.state))
        })
    }
})
export class GameController {
    @OnConnect()
    @EmitOnSuccess('state')
    connect() {
        console.log('connneeee')

        return GameModel.instance.state
    }

    @OnMessage()
    @EmitOnSuccess()
    state() {
        console.log('icici')

        return GameModel.instance.state
    }

    @OnMessage()
    @EmitOnSuccess()
    async join(@ConnectedSocket() socket: Socket) {
        const req: Request = socket.request as Request,
            user: DocumentType<UserModel> | undefined = req.session.user

        if (!user) throw new NotFoundUserError

        const game: GameModel = GameModel.instance,
            gameId: string | undefined = game.id

        // #achan
        if (!gameId) throw new Error

        if (user.currentGameId !== null && gameId !== user.currentGameId) throw new Error

        user.currentGameId = gameId
        await user.save()

        game.newPlayer(user.username, socket.id)
    }
}