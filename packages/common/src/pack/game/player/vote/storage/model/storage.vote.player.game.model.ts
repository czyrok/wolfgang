import { PlayerGameModel } from '../../../model/player.game.model'
import { VotePlayerGameModel } from '../../model/vote.player.game.model'

/**
 * Classe qui gère les votes
 */
export class StorageVotePlayerGameModel {
    private _votesList: Array<VotePlayerGameModel> = new Array

    /**
     * Renvoie la liste des votes
     * @returns Renvoie la liste des votes
     */
    public get votesList(): Array<VotePlayerGameModel> {
        return this._votesList
    }

    /**
     * Fonction qui renvoie true si le vote a été retiré, false sinon
     * @param player Joueur voté
     * @returns Renvoie true si le vote a été retiré, false sinon
     */
    public removeVoteOfPlayer(player: PlayerGameModel): boolean {
        for (let i = 0; i < this.votesList.length; i++) {
            if (this.votesList[i].votingPlayer.user._id === player.user._id) {
                this.votesList.splice(i, 1)

                return true
            }
        }

        return false
    }

    /**
     * Focntion qui ajoute un vote et renvoie true si le joueur a déjà été voté, false sinon
     * @param newVote Vote
     * @returns Renvoie true si le joueur a déjà été voté, false sinon
     */
    public toVote(newVote: VotePlayerGameModel): boolean {
        const hasVotedBefore: boolean = this.removeVoteOfPlayer(newVote.votingPlayer)

        this.votesList.push(newVote)

        return hasVotedBefore
    }

    /**
     * Focntion qui renvoie le joueur le plus voté de la liste des joueurs passé en paramètre 
     * @param players Liste des joueurs votés
     * @returns Renvoie le joueur le plus voté de la liste des joueurs passé en paramètre
     */
    public mostVotedOfPlayersGroup(players: Array<PlayerGameModel>): PlayerGameModel | null {
        const votedPlayers: Array<[PlayerGameModel, number]> = new Array

        for (const vote of this.votesList) {
            for (const player of players) {
                if (player.isDead) continue

                if (vote.votingPlayer.user._id === player.user._id) {
                    const votedPlayer: [PlayerGameModel, number] | undefined = votedPlayers.find(([a,]: [PlayerGameModel, number]) => a.user._id == vote.votedPlayer.user._id)

                    if (votedPlayer) {
                        votedPlayer[1]++
                    } else {
                        votedPlayers.push([vote.votedPlayer, 1])
                    }

                    break
                }
            }
        }

        let max: number = 0,
            mostVotedPlayer: PlayerGameModel | null = null

        for (let votedPlayer of votedPlayers) {
            if (votedPlayer[1] > max) {
                max = votedPlayer[1]
                mostVotedPlayer = votedPlayer[0]
            } else if (votedPlayer[1] == max) {
                mostVotedPlayer = null
            }
        }

        return mostVotedPlayer
    }

    /**
     * Focntion qui vide la liste des joueurs votés
     */
    public reset(): void {
        this.votesList.splice(0, this.votesList.length)
    }
}