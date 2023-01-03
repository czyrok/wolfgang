export class PasswordInvalidLocalPassportError extends Error {
    public constructor() {
        super('Le mot de passe est invalide')
    }
}