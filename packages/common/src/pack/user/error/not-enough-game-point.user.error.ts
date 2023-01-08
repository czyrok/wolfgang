import { ServerError } from 'ts-socket.io-controller'

export class NotEnoughGamePointUserError extends ServerError {
    constructor() {
        super(400, 'L\'utilisateur n\'a pas assez de point de jeu')
    }
}