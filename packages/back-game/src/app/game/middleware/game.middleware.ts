import { GameModel } from 'common'
import { Socket } from 'socket.io'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'
import { MiddlewareInterface, SocketMiddleware } from 'ts-socket.io-controller'

// #afaire
@SocketMiddleware('/game/:id')
export class GameMiddleware implements MiddlewareInterface {
    type: 'MiddlewareInterface' = 'MiddlewareInterface'

    use(socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>, next: (err?: any) => any) {
        // Tester si l'id du namespace est le même que celui de la partie
        

        // Autre middleware pour vérifier que si la partie est lancé l'utilisateur fait bien partie de la partie ?
        // Ou mode spectateur

        console.log('--------')
        console.log(socket.nsp)

        next()
    }
}