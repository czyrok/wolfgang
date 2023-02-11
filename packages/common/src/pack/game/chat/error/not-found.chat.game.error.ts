export class NotFoundChatGameError extends Error {
    public constructor() {
        super('Chat non trouvé')
    }
}