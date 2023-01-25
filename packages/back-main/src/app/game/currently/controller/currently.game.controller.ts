import { Namespace, Socket } from 'socket.io'
import { instanceToPlain } from 'class-transformer'
import { ConnectedSocket, EmitOnSuccess, OnMessage, SocketController } from 'ts-socket.io-controller'
import { GameModel } from 'common'

import { GetConnectionRegisteryModel } from '../../../registery/connection/get/model/get.connection.registery.model'
import { CreateConnectionRegisteryModel } from '../../../registery/connection/create/model/create.connection.registery.model'
import { Request } from 'express'
import { DocumentType } from '@typegoose/typegoose'
import { UserModel } from 'common'
import { NotFoundUserError } from 'common'

@SocketController({
    namespace: '/game/currently',
    init: (io: Namespace) => {
        GetConnectionRegisteryModel.instance.getLink.subscribe((games: Array<GameModel>) => {
            io.emit('list', instanceToPlain(games))
        })
    }
})
export class CurrentlyGameController {
    @OnMessage()
    @EmitOnSuccess()
    list() {
        return GetConnectionRegisteryModel.instance.getLink.data
    }

    @OnMessage()
    @EmitOnSuccess()
    async create(@ConnectedSocket() socket: Socket) {
        const req: Request = socket.request as Request,
            user: DocumentType<UserModel> | undefined = req.session.user

        if (!user) throw new NotFoundUserError

        const gameId: string | null = user.currentGameId

        if (gameId) return ''

        const conn: CreateConnectionRegisteryModel = new CreateConnectionRegisteryModel

        const id: string = await conn.createGame()

        return id
    }
}