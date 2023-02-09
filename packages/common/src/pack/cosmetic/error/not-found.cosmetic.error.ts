export class NotFoundCosmeticError extends Error {
    public constructor() {
        super('Cosmetic non trouvé')
    }
}