export class UserNotFoundPassportError extends Error {
    public constructor() {
        super('Utilisateur non trouvé')
    }
}