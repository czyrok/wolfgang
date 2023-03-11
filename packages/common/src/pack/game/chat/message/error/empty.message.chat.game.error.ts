export class EmptyMessageChatGameError extends Error {
    public constructor() {
        super('Le message est vide')
    }
}