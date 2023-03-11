export class NotAllowedToVoteHimPlayerGameError extends Error {
    public constructor() {
        super('Vous ne pouvez pas voter cette personne')
    }
}