import { PlayerGameModel } from '../../../model/player.game.model';
import { CardPlayerGameModel } from '../../model/card.player.game.model';

export class ToSuspectCardPlayerGameModel {
    public constructor(
        private _suspectingPlayer: PlayerGameModel,
        private _suspectedPlayer: PlayerGameModel,
        private _suspectedCard: CardPlayerGameModel
    ) { }

    public set suspectingPlayer(value: PlayerGameModel) {
        this._suspectingPlayer = value
    }

    public set suspectedPlayer(value: PlayerGameModel) {
        this._suspectedPlayer = value
    }

    public set suspectedCard(value: CardPlayerGameModel) {
        this._suspectedCard = value
    }

    public get suspectingPlayer(): PlayerGameModel {
        return this._suspectingPlayer
    }

    public get suspectedPlayer(): PlayerGameModel {
        return this._suspectedPlayer
    }

    public get suspectedCard(): CardPlayerGameModel {
        return this._suspectedCard
    }
}