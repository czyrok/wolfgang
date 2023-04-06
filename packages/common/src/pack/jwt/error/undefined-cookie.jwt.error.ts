export class UndefinedCookieJwtError extends Error {
    public constructor() {
        super('Le jeton est introuvable dans les cookies')
    }
}