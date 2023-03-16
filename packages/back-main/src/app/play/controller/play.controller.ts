import { EmitOnFail, EmitOnSuccess, OnMessage, SocketController, NamespaceParam } from 'ts-socket.io-controller'

import { CheckConnectionRegisteryHelper } from '../../registery/connection/check/helper/check.connection.registery.helper'

@SocketController({
    namespace: '/play/:game_id',
    init: () => { }
})
export class PlayController {
    @OnMessage()
    @EmitOnSuccess()
    @EmitOnFail()
    async check(@NamespaceParam('game_id') gameId: string) {
        const test: boolean = await CheckConnectionRegisteryHelper.checkGame(gameId)

        if (test) return true

        return false
    }
}