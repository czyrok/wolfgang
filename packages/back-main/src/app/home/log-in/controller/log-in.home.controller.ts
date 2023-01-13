import { EmitOnFail, SocketRequest, OnConnect, OnDisconnect, OnMessage, SocketController, EmitOnSuccess } from 'ts-socket.io-controller'
import { EnvUtil, VarEnvEnum, JWTHelper } from 'common'

@SocketController({
    namespace: '/home/log-in',
    init: () => {}
})
export class LogInHomeController {
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
    trigger(@SocketRequest() req: any) {
        console.log('slt')
        req.cookies[EnvUtil.get(VarEnvEnum.JWT_COOKIE_NAME)] = JWTHelper.generate(req, req.user)
    }
}