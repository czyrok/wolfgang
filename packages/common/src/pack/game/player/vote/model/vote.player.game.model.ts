import { Exclude, Expose } from 'class-transformer'

import { TypeVotePlayerGameEnum } from '../type/enum/type.vote.player.game.enum'

@Exclude()
export class VotePlayerGameModel {
    @Expose()
    private _votingUser: string

    @Expose()
    private _votedUser: string

    @Expose()
    private _message: string

    @Expose()
    private _type: TypeVotePlayerGameEnum

    public constructor(
        votingUser: string,
        votedUser: string,
        message: string,
        type: TypeVotePlayerGameEnum
    ) {
        this._votingUser = votingUser
        this._votedUser = votedUser
        this._message = message
        this._type = type
    }

    public get votingUser(): string {
        return this._votingUser
    }

    public get votedUser(): string {
        return this._votedUser
    }

    public get message(): string {
        return this._message
    }

    public get type(): TypeVotePlayerGameEnum {
        return this._type
    }
}