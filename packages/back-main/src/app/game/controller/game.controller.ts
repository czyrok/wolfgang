import { EmitOnFail, EmitOnSuccess, OnMessage, SocketController, ConnectedSocket } from 'ts-socket.io-controller'
import { Request } from 'express'
import { Socket } from 'socket.io'
import { DocumentType } from '@typegoose/typegoose'
import { UserModel, NotFoundUserError } from 'common'

import { CheckConnectionGameModel } from '../connection/check/model/check.connection.game.model'

@SocketController({
    namespace: '/game',
    init: () => { }
})
export class GameController {
    @OnMessage()
    @EmitOnSuccess()
    @EmitOnFail()
    async check(@ConnectedSocket() socket: Socket) {
        const req: Request = socket.request as Request,
            user: DocumentType<UserModel> | undefined = req.session.user

        if (!user) throw new NotFoundUserError

        const gameId: string | null = user.currentGameId

        if (!gameId) return ''

        const gameConnection: CheckConnectionGameModel = new CheckConnectionGameModel(gameId),
            test: boolean = await gameConnection.checkGame()

        if (!test) {
            user.currentGameId = null
            await user.save()

            return ''
        }

        return gameId
    }
}