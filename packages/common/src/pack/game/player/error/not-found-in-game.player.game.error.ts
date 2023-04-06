/**
 * Classe qui renvoie un message d'erreur si le joueur ne fait pas partie de la partie
 */
export class NotFoundInGamePlayerGameError extends Error {
    /**
     * Constructeur
     */
    public constructor() {
        super('Vous ne faites pas partie de la partie')
    }
}