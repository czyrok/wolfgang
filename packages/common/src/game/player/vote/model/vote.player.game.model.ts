import { GamePlayerPlayerGameModel } from "../../model/game-player.player.game.model"

export class VotePlayerGameModel {
    private _votingPlayer!: GamePlayerPlayerGameModel
    private _votedPlayer!: GamePlayerPlayerGameModel
    private _message!: string

    public constructor(votingPlayer: GamePlayerPlayerGameModel, votedPlayer: GamePlayerPlayerGameModel, message: string) {
        this._votingPlayer = votingPlayer
        this._votedPlayer = votedPlayer
        this._message = message
    }

    public set votingPlayer(value: GamePlayerPlayerGameModel) {
        this._votingPlayer = value
    }

    public set votedPlayer(value: GamePlayerPlayerGameModel) {
        this._votedPlayer = value
    }

    public set message(value: string) {
        this._message = value
    }

    public get votingplayer(): GamePlayerPlayerGameModel {
        return this._votingPlayer
    }

    public get votedPlayer(): GamePlayerPlayerGameModel {
        return this._votedPlayer
    }

    public get message(): string {
        return this._message
    }
}