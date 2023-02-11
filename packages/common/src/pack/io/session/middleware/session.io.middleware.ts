import { Request } from 'express'
import { Socket } from 'socket.io'
import { MiddlewareInterface, SocketMiddleware } from 'ts-socket.io-controller'

import { SessionConfigAppUtil } from '../../../app/config/session/util/session.config.app.util'

@SocketMiddleware()
export class SessionIoMiddleware implements MiddlewareInterface {
    type: 'MiddlewareInterface' = 'MiddlewareInterface'

    use(socket: Socket, next: (err?: any) => any): void {
        SessionConfigAppUtil.sessionMiddleware(socket.request as Request, {} as any, next as any)
    }
}