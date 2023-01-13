export class AlreadyConfiguredPassportError extends Error {
    public constructor() {
        super('Passport est déjà configuré')
    }
}