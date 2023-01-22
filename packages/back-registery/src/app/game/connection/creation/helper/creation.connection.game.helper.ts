import { Socket } from 'socket.io'
import { GameModel } from 'common'

export class CreationConnectionGameHelper {
    public static async waitRes(socket: Socket, creationCode: string): Promise<string> {
        return new Promise((resolve: (value: string) => void) => {
            const listener: (game: GameModel) => void = (game: GameModel) => {
                if (creationCode === game.creationCode) {
                    socket.off('ready', listener)

                    resolve(game.id)
                }
            }

            socket.on('ready', listener)
            socket.emit('create', creationCode)
        })
    }
}