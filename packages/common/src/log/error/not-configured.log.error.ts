export class NotConfiguredLogError extends Error {
    public constructor() {
        super('Le logger n\'est pas configuré')
    }
}