import { PlayerGameModel } from '../../../model/player.game.model'
import { VotePlayerGameModel } from '../../model/vote.player.game.model'
import { HandlerPlayerGameModel } from '../../../handler/model/handler.player.game.model'

export class HandlerVotePlayerGameModel {
    private static _instance: HandlerVotePlayerGameModel = new HandlerVotePlayerGameModel

    private _vote: Array<VotePlayerGameModel> = new Array

    private constructor() { }

    public static get instance(): HandlerVotePlayerGameModel {
        return this._instance
    }

    public get vote(): Array<VotePlayerGameModel> {
        return this._vote
    }

    public removeVoteOfPlayer(player: PlayerGameModel): void {
        for (let i = 0; i < this.vote.length; i++) {
            if (this.vote[i].votingUser == player.userId) {
                this.vote.splice(i, 1)

                break
            }
        }
    }

    public toVote(newVote: VotePlayerGameModel): void {
        let playerHandler: HandlerPlayerGameModel = HandlerPlayerGameModel.instance,
            player: PlayerGameModel | undefined = playerHandler.getPlayer(newVote.votingUser)

        if (player !== undefined) {
            this.removeVoteOfPlayer(player)

            this.vote.push(newVote)
        }
    }

    public mostVotedOfPlayersGroup(players: Array<PlayerGameModel>): PlayerGameModel | null {
        let playerHandler: HandlerPlayerGameModel = HandlerPlayerGameModel.instance,
            votedPlayers: Array<[PlayerGameModel, number]> = new Array

        for (let vote of this.vote) {
            for (let player of players) {
                if (vote.votingUser == player.userId) {
                    let votedPlayer: [PlayerGameModel, number] | undefined = votedPlayers.find(([a,]: [PlayerGameModel, number]) => a.userId == vote.votedUser)

                    if (votedPlayer !== undefined) {
                        votedPlayer[1]++
                    } else {
                        let player: PlayerGameModel | undefined = playerHandler.getPlayer(vote.votedUser)
                        if (player !== undefined) votedPlayers.push([player, 1])
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
        this.vote.splice(0, this.vote.length)
    }
}