export class AlreadyConfiguredLogError extends Error {
    public constructor() {
        super('Le logger est déjà configuré')
    }
}