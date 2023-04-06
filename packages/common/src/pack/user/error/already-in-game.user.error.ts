export class AlreadyInGameUserError extends Error {
    public constructor() {
        super('Vous êtes déjà dans une partie')
    }
}