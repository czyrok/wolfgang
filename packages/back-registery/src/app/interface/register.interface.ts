import { Socket } from 'socket.io'
import { GameInterface } from './game.interface'

export interface RegisterInterface {
    [key: string]: {
        socket: Socket
        games: Array<GameInterface>
    }
}