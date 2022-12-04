import { EmitOnFail, EmitOnSuccess, OnConnect, OnDisconnect, OnMessage, SkipEmitOnEmptyResult, SocketController, SocketIO } from 'ts-socket.io-controller'

@SocketController({
    namespace: '/main/games'
})
export class GamesMainController {
    @OnConnect()
    connection() {
        console.log('client connected');
    }

    @OnDisconnect()
    disconnect() {
        console.log('client disconnected');
    }

    @OnMessage()
    @EmitOnSuccess()
    @EmitOnFail()
    @SkipEmitOnEmptyResult()
    list() {
        return []
    }
}