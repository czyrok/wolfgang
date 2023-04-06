/**
 * Classe qui renvoie une erreur si le joueur essaie de faire quelque chose alors que ce n'est pas son tour
 */
export class NotHisTurnPlayerGameError extends Error {
    /**
     * Constructeur
     */
    public constructor() {
        super('Ce n\'est pas votre tour')
    }
}