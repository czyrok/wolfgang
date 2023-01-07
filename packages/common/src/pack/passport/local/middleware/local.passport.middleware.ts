import { Socket } from 'socket.io'
import { MiddlewareInterface, SocketMiddleware } from 'ts-socket.io-controller'
import { initialize, authenticate } from 'passport'

import { TypePassportEnum } from '../../type/enum/type.passport.enum'

@SocketMiddleware()
export class LocalPassportMiddleware implements MiddlewareInterface {
    type: 'MiddlewareInterface' = 'MiddlewareInterface'

    use(socket: Socket, next: (err?: any) => any): void {
        initialize()(socket.request as any, {} as any, next)
        authenticate(TypePassportEnum.LOCAL)(socket.request as any, {} as any, next)
    }
}