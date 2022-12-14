import { PlayerGameModel, CardPlayerGameModel } from 'common'

export class ToSuspectCardPlayerGameModel {
    public constructor(
        private _suspectingPlayer: PlayerGameModel,
        private _suspectedPlayer: PlayerGameModel,
        private _suspectedCard: CardPlayerGameModel
    ) { }

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