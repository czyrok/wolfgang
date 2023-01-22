import { EmitOnFail, EmitOnSuccess, OnMessage, SocketController, ConnectedSocket, MessageBody } from 'ts-socket.io-controller'
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
    async checkUserGame(@ConnectedSocket() socket: Socket) {
        const req: Request = socket.request as Request,
            user: DocumentType<UserModel> | undefined = req.session.user

        if (!user) throw new NotFoundUserError

        console.log('-----')

        const gameId: string | null = user.currentGameId

        console.log('stttt1', gameId)

        if (!gameId) return ''

        const gameConnection: CheckConnectionGameModel = new CheckConnectionGameModel(gameId),
            test: boolean = await gameConnection.checkGame()

        if (!test) {
            console.log('stttt')
            await user.updateOne({ currentGameId: null })

            return ''
        }

        console.log(gameId)

        return gameId
    }

    @OnMessage()
    @EmitOnSuccess()
    @EmitOnFail()
    async check(@MessageBody() gameId: string) {
        console.log(gameId)

        const gameConnection: CheckConnectionGameModel = new CheckConnectionGameModel(gameId),
            test: boolean = await gameConnection.checkGame()

        console.log(test)

        if (test) return true

        return false
    }
}