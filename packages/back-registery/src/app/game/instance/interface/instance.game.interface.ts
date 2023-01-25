import { Socket } from 'socket.io'
import { GameModel } from 'common'

export interface InstanceGameInterface {
    socket: Socket,
    games: Array<GameModel>
}