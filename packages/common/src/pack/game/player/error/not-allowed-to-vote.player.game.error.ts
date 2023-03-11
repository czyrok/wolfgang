export class NotAllowedToVotePlayerGameError extends Error {
    public constructor() {
        super('Vous ne pouvez pas voter')
    }
}