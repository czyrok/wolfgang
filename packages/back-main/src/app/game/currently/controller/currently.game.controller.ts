import { Namespace } from 'socket.io'
import { instanceToPlain } from 'class-transformer'
import { EmitOnSuccess, OnMessage, SocketController } from 'ts-socket.io-controller'
import { GameModel } from 'common'

import { GetConnectionRegisteryModel } from '../../../registery/connection/get/model/get.connection.registery.model'
import { CreateConnectionRegisteryModel } from '../../../registery/connection/create/model/create.connection.registery.model'

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
    async create() {
        const conn: CreateConnectionRegisteryModel = new CreateConnectionRegisteryModel

        const id: string = await conn.createGame()

        return id
    }
}