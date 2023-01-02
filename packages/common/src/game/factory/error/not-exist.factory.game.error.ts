export class NotExistFactoryGameError extends Error {
    public constructor(type: string) {
        super(`${type} n'existe pas dans le stockage de la factory`)
    }
}