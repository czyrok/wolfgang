import { Socket } from 'socket.io'

import { ThreadGameInterface } from '../../thread/interface/thread.game.interface'

export interface InstanceGameInterface {
    socket: Socket,
    games: Array<ThreadGameInterface>
}