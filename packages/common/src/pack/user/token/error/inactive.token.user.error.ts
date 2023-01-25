export class InactiveTokenUserError extends Error {
    public constructor() {
        super('Le jeton est inactif')
    }
}