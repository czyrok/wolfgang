export class NotEnoughGamePointUserError extends Error {
    constructor() {
        super('L\'utilisateur n\'a pas assez de point de jeu')
    }
}