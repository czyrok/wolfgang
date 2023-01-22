import { EmitOnSuccess, OnConnect, OnMessage, SocketController } from 'ts-socket.io-controller'
import { GameModel } from 'common'

@SocketController({
    namespace: '/test/:id',
    init: () => {}
})
export class TestController {
    @OnConnect()
    @EmitOnSuccess('state')
    connect() {
        return GameModel.instance.state
    }

    @OnMessage()
    @EmitOnSuccess()
    state() {
        return GameModel.instance.state
    }
}