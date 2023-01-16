export class NotFoundTokenUserError extends Error {
    public constructor() {
        super('Le jeton est introuvable dans la base de données')
    }
}