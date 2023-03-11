import { Exclude, Expose } from 'class-transformer'
import { PlayerGameModel } from '../../model/player.game.model'

import { TypeVotePlayerGameEnum } from '../type/enum/type.vote.player.game.enum'

@Exclude()
export class VotePlayerGameModel {
    @Expose()
    private _votingPlayer: PlayerGameModel

    @Expose()
    private _votedPlayer: PlayerGameModel

    @Expose()
    private _message: string

    @Expose()
    private _type: TypeVotePlayerGameEnum

    public constructor(
        votingPlayer: PlayerGameModel,
        votedPlayer: PlayerGameModel,
        message: string,
        type: TypeVotePlayerGameEnum
    ) {
        this._votingPlayer = votingPlayer
        this._votedPlayer = votedPlayer
        this._message = message
        this._type = type
    }

    @Expose()
    public get votingPlayer(): PlayerGameModel {
        return this._votingPlayer
    }

    @Expose()
    public get votedPlayer(): PlayerGameModel {
        return this._votedPlayer
    }

    @Expose()
    public get message(): string {
        return this._message
    }

    @Expose()
    public get type(): TypeVotePlayerGameEnum {
        return this._type
    }
}