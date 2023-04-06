import { Exclude, Expose } from 'class-transformer'

@Exclude()
export class VoteFormControllerModel {
    @Expose()
    private _votingPlayer: string

    @Expose()
    private _votedPlayer: string

    public constructor(
        votingPlayer: string,
        votedPlayer: string
    ) {
        this._votingPlayer = votingPlayer
        this._votedPlayer = votedPlayer
    }

    @Expose()
    public get votingPlayer(): string {
        return this._votingPlayer
    }

    @Expose()
    public get votedPlayer(): string {
        return this._votedPlayer
    }
}