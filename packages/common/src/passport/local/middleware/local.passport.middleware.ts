import { Socket } from 'socket.io'
import passport from 'passport'
import { MiddlewareInterface, SocketMiddleware } from 'ts-socket.io-controller'

@SocketMiddleware()
export class LocalPassportMiddleware implements MiddlewareInterface {
    use(socket: Socket, next: (err?: any) => any) {
        passport.initialize()(socket.request as any, {} as any, next)
        passport.authenticate('local')(socket.request as any, {} as any, next)
    }
}