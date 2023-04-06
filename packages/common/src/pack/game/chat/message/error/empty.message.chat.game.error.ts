/**
 * Classe qui renvoie une erreur quand le message est vide
 */
export class EmptyMessageChatGameError extends Error {
    /**
     * Constructeur
     */
    public constructor() {
        super('Le message est vide')
    }
}