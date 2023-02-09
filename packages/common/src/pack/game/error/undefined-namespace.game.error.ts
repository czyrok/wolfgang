export class UndefinedNamespaceGameError extends Error {
    public constructor() {
        super('Le namespace socket.io est indéfini')
    }
}