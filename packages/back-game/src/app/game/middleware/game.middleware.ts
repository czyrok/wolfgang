import { Socket } from 'socket.io'
import { MiddlewareInterface, SocketMiddleware } from 'ts-socket.io-controller'
import { LogUtil, TypeLogEnum, GameModel } from 'common'

// #afaire
@SocketMiddleware('/game/:id')
export class GameMiddleware implements MiddlewareInterface {
    type: 'MiddlewareInterface' = 'MiddlewareInterface'

    use(socket: Socket, next: (err?: any) => any) {
        // Tester si l'id du namespace est le même que celui de la partie idem pour /test/:id
        

        // Autre middleware pour vérifier que si la partie est lancé l'utilisateur fait bien partie de la partie ?
        // Ou mode spectateur

        const id: string = socket.nsp.name.split('/')[2]
        LogUtil.logger(TypeLogEnum.APP).trace(id, 'beach', GameModel.instance.id)

        next()
    }
}