export class NotFoundInGamePlayerGameError extends Error {
    public constructor() {
        super('Vous ne faites pas partie de la partie')
    }
}