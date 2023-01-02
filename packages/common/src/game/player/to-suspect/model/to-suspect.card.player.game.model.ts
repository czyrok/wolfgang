import { CardGameModel } from '../../../card/model/card.game.model'
import { PlayerGameModel } from '../../model/player.game.model'

export class ToSuspectCardPlayerGameModel {
    public constructor(
        private _suspectingPlayer: PlayerGameModel,
        private _suspectedPlayer: PlayerGameModel,
        private _suspectedCard: CardGameModel
    ) { }

    public get suspectingPlayer(): PlayerGameModel {
        return this._suspectingPlayer
    }

    public get suspectedPlayer(): PlayerGameModel {
        return this._suspectedPlayer
    }

    public get suspectedCard(): CardGameModel {
        return this._suspectedCard
    }
}