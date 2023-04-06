/**
 * Classe qui renvoie un message d'erreur si le joueur essaie d'envoyer un message alors qu'il ne peut pas 
 */
export class NotAllowedToSendMessagePlayerGameError extends Error {
    /**
     * Constructeur
     */
    public constructor() {
        super('Vous ne pouvez pas envoyer de message')
    }
}