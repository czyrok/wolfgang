import { PlayerGameModel } from "../../model/player.game.model"

export class VotePlayerGameModel {
    public constructor(
        private _votingPlayer: PlayerGameModel,
        private _votedPlayer: PlayerGameModel,
        private _message: string
    ) { }

    public get votingplayer(): PlayerGameModel {
        return this._votingPlayer
    }

    public get votedPlayer(): PlayerGameModel {
        return this._votedPlayer
    }

    public get message(): string {
        return this._message
    }
}