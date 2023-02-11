export class NotAllowedToSendMessagePlayerGameError extends Error {
    public constructor() {
        super('Vous ne pouvez pas envoyer de message')
    }
}