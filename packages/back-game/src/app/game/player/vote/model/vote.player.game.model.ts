import { PlayerGameModel } from "../../model/player.game.model"

export class VotePlayerGameModel {
    public constructor(
        private _votingPlayer: PlayerGameModel,
        private _votedPlayer: PlayerGameModel,
        private _message: string
    ) { }

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