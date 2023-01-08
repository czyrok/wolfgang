import { EnvUtil, VarEnvEnum, JWTHelper } from 'common'
import { EmitOnFail, SocketRequest, OnConnect, OnDisconnect, OnMessage, SocketController, EmitOnSuccess } from 'ts-socket.io-controller'

@SocketController({
    namespace: '/home/log-in/:username',
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
        req.cookies[EnvUtil.get(VarEnvEnum.JWT_COOKIE_NAME)] = JWTHelper.generate(req, req.user)
    }
}