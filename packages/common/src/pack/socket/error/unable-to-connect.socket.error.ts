export class UnableToConnectSocketError extends Error {
    public constructor() {
        super('Impossible de se connecter')
    }
}