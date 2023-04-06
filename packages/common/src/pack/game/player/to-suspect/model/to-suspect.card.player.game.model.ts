import { CardGameModel } from '../../../card/model/card.game.model'
import { PlayerGameModel } from '../../model/player.game.model'

/**
 * Classe qui créée une suspicion de carte
 */
export class ToSuspectCardPlayerGameModel {
    /**
     * Constructeur
     * @param _suspectingPlayer Joueur qui suspecte une carte
     * @param _suspectedPlayer Joueur qui est suspecté d'avoir cette carte
     * @param _suspectedCard Carte suspectée par le joueur
     */
    public constructor(
        private _suspectingPlayer: PlayerGameModel,
        private _suspectedPlayer: PlayerGameModel,
        private _suspectedCard: CardGameModel
    ) { }

    /**
     * Renvoie le joueur qui suspecte
     * @return Renvoie le joueur qui suspecte
     */
    public get suspectingPlayer(): PlayerGameModel {
        return this._suspectingPlayer
    }

    /**
     * Renvoie le joueur suspecté
     * @returns Renvoie le joueur suspecté
     */
    public get suspectedPlayer(): PlayerGameModel {
        return this._suspectedPlayer
    }

    /**
     * Renvoie la carte suspectée
     * @returns Renvoie la carte suspectée
     */
    public get suspectedCard(): CardGameModel {
        return this._suspectedCard
    }
}