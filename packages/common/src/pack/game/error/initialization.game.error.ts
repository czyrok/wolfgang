export class InitializationGameError extends Error {
    public constructor() {
        super('Un problème est survenu lors de l\'initialisation de la partie')
    }
}