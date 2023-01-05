import { Socket } from 'socket.io'
import { MiddlewareInterface } from 'ts-socket.io-controller'

import { SocketMiddleware } from '../../../fix/tssocketiocontroller.fix'

import { initialize, authenticate } from '../../../fix/passport.fix'

import { TypePassportEnum } from '../../type/enum/type.passport.enum'

@SocketMiddleware()
export class ScopePassportMiddleware implements MiddlewareInterface {
    type: 'MiddlewareInterface' = 'MiddlewareInterface'

    use(socket: Socket, next: (err?: any) => any): void {
        initialize()(socket.request as any, {} as any, next)
        authenticate(TypePassportEnum.SCOPE, {
            // #achan
            scope: 'admin'
        })(socket.request as any, {} as any, next)
    }
}