export class NotHisTurnPlayerGameError extends Error {
    public constructor() {
        super('Ce n\'est pas votre tour')
    }
}