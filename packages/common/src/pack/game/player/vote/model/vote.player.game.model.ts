import { Exclude, Expose } from 'class-transformer'
import { PlayerGameModel } from '../../model/player.game.model'

import { TypeVotePlayerGameEnum } from '../type/enum/type.vote.player.game.enum'

/**
 * Classe qui créée un vote d'un joueur
 */
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

    /**
     * Constructeur
     * @param votingPlayer Joueur qui vote
     * @param votedPlayer Joueur qui est voté
     * @param message La raison du vote
     * @param type Type de vote
     */
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

    /**
     * Renvoie le joueur qui vote
     * @returns Renvoie le joueur qui vote
     */
    @Expose()
    public get votingPlayer(): PlayerGameModel {
        return this._votingPlayer
    }

    /**
     * Renvoie le joueur voté
     * @returns Renvoie le joeuur voté
     */
    @Expose()
    public get votedPlayer(): PlayerGameModel {
        return this._votedPlayer
    }

    /**
     * Renvoie la raison du vote
     * @returns Renvoie la raison du vote
     */
    @Expose()
    public get message(): string {
        return this._message
    }

    /**
     * Renvoie le type du vote
     * @returns Renvoie le type du vote
     */
    @Expose()
    public get type(): TypeVotePlayerGameEnum {
        return this._type
    }
}