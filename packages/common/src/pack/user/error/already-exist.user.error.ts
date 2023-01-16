export class AlreadyExistUserError extends Error {
    public constructor() {
        super('L\'utilisateur existe déjà')
    }
}