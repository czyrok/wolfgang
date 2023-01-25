export class NotFoundInstanceGameError extends Error {
    public constructor() {
        super('L\'instance n\'existe pas')
    }
}