import { PlayerGameModel } from '../../../model/player.game.model'
import { VotePlayerGameModel } from '../../model/vote.player.game.model'

export class StorageVotePlayerGameModel {
    private _votesList: Array<VotePlayerGameModel> = new Array

    public get votesList(): Array<VotePlayerGameModel> {
        return this._votesList
    }

    public removeVoteOfPlayer(player: PlayerGameModel): boolean {
        for (let i = 0; i < this.votesList.length; i++) {
            if (this.votesList[i].votingPlayer.user._id === player.user._id) {
                this.votesList.splice(i, 1)

                return true
            }
        }

        return false
    }

    public toVote(newVote: VotePlayerGameModel): boolean {
        const hasVotedBefore: boolean = this.removeVoteOfPlayer(newVote.votingPlayer)

        this.votesList.push(newVote)

        return hasVotedBefore
    }

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

    public reset(): void {
        this.votesList.splice(0, this.votesList.length)
    }
}