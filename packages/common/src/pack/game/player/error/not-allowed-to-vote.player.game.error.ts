/**
 * Classe qui renvoie un message d'erreur si le joueur essaie de voter alors qu'il ne peut pas
 */
export class NotAllowedToVotePlayerGameError extends Error {
    /**
     * Constructeur
     */
    public constructor() {
        super('Vous ne pouvez pas voter')
    }
}