import { PlayerGameModel } from '../../model/player.game.model'

import { TypeVotePlayerGameEnum } from '../type/enum/type.vote.player.game.enum'

export class VotePlayerGameModel {
    public constructor(
        private _votingPlayer: PlayerGameModel,
        private _votedPlayer: PlayerGameModel,
        private _message: string,
        private _type: TypeVotePlayerGameEnum
    ) { }

    public get votingPlayer(): PlayerGameModel {
        return this._votingPlayer
    }

    public get votedPlayer(): PlayerGameModel {
        return this._votedPlayer
    }

    public get message(): string {
        return this._message
    }

    public get type(): TypeVotePlayerGameEnum {
        return this._type
    }
}