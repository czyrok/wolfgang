export class UndefinedJwtError extends Error {
    public constructor() {
        super('Aucun jeton n\'a été transmis')
    }
}