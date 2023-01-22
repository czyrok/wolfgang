import { Socket, Namespace } from 'socket.io'
import { instanceToPlain } from 'class-transformer'
import { Request } from 'express'
import { DocumentType } from '@typegoose/typegoose'
import { OnMessage, EmitOnSuccess, MessageBody, SocketController, ConnectedSocket, OnConnect } from 'ts-socket.io-controller'
import { GameModel, NotFoundUserError, UserModel, InitializationGameError, AlreadyInGameUserError, LogUtil, TypeLogEnum } from 'common'

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
    @OnMessage()
    @EmitOnSuccess()
    state() {
        return GameModel.instance.state
    }

    @OnMessage()
    @EmitOnSuccess()
    async join(@ConnectedSocket() socket: Socket) {
        const req: Request = socket.request as Request,
            userDoc: DocumentType<UserModel> | undefined = req.session.user

        if (!userDoc) throw new NotFoundUserError

        const game: GameModel = GameModel.instance,
            gameId: string | undefined = game.id

        // #achan
        if (!gameId) throw new InitializationGameError
        if (userDoc.currentGameId !== null && gameId !== userDoc.currentGameId) throw new AlreadyInGameUserError

        if (userDoc.currentGameId !== gameId) {
            await userDoc.updateOne({
                currentGameId: gameId
            })
        }

        const user: UserModel = userDoc.toObject()

        LogUtil.logger(TypeLogEnum.APP).trace(game.newPlayer(user, socket.id))
    }
}