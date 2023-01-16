export class InvalidPasswordUserError extends Error {
    public constructor() {
        super('Mot de passe invalide')
    }
}