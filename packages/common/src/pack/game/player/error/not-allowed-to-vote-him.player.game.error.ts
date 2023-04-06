/**
 * Classe qui renvoie un message d'erreur si un joueur vote une personne qu'il ne peut pas voter
 */
export class NotAllowedToVoteHimPlayerGameError extends Error {
    /**
     * Constructeur
     */
    public constructor() {
        super('Vous ne pouvez pas voter cette personne')
    }
}