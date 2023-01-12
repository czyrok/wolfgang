export class NotFoundUserError extends Error {
    public constructor() {
        super('Utilisateur non trouvé')
    }
}