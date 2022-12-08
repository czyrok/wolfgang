import { PlayerGameModel } from "../../model/player.game.model"

export class VotePlayerGameModel {
    private _votingPlayer!: PlayerGameModel
    private _votedPlayer!: PlayerGameModel
    private _message!: string

    public constructor(votingPlayer: PlayerGameModel, votedPlayer: PlayerGameModel, message: string) {
        this._votingPlayer = votingPlayer
        this._votedPlayer = votedPlayer
        this._message = message
    }

    public set votingPlayer(value: PlayerGameModel) {
        this._votingPlayer = value
    }

    public set votedPlayer(value: PlayerGameModel) {
        this._votedPlayer = value
    }

    public set message(value: string) {
        this._message = value
    }

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