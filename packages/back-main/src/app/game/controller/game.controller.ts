import { EmitOnFail, EmitOnSuccess, OnMessage, SocketController, ConnectedSocket, MessageBody } from 'ts-socket.io-controller'
import { Request } from 'express'
import { Socket } from 'socket.io'
import { DocumentType } from '@typegoose/typegoose'
import { UserModel, NotFoundUserError } from 'common'

import { CheckConnectionRegisteryHelper } from '../../registery/connection/check/helper/check.connection.registery.helper'

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

        const gameId: string | null = user.currentGameId

        if (!gameId) return ''

        const test: boolean = await CheckConnectionRegisteryHelper.checkGame(gameId)

        if (!test) {
            await user.updateOne({ currentGameId: null })

            return ''
        }

        return gameId
    }

    @OnMessage()
    @EmitOnSuccess()
    @EmitOnFail()
    async check(@MessageBody() gameId: string) {
        const test: boolean = await CheckConnectionRegisteryHelper.checkGame(gameId)

        if (test) return true

        return false
    }
}