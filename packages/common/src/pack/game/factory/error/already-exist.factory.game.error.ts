export class AlreadyExistFactoryGameError extends Error {
    public constructor(type: string) {
        super(`${type} existe déjà dans le stockage de la factory`)
    }
}