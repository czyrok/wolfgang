/**
 * Renvoie un message d'erreur si le chat d'une partie n'est pas trouvé
 */
export class NotFoundChatGameError extends Error {
    /**
    * Constructeur
    */
    public constructor() {
        super('Chat non trouvé')
    }
}