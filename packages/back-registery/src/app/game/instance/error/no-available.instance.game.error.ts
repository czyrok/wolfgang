export class NoAvailableInstanceGameError extends Error {
    public constructor() {
        super('Il n\'y a aucune instance de partie disponible')
    }
}