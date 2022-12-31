import { Subject, Subscription } from 'rxjs'

import { PlayerGameModel } from '../../model/player.game.model'

import { ChangeInterface } from '../../../change/interface/change.interface'

export class HandlerPlayerGameModel implements ChangeInterface<Array<PlayerGameModel>> {
    private static _instance: HandlerPlayerGameModel = new HandlerPlayerGameModel

    private _players: Array<PlayerGameModel> = new Array
    private _stateChange: Subject<Array<PlayerGameModel>> = new Subject()

    private constructor() { }

    public static get instance(): HandlerPlayerGameModel {
        return this._instance
    }

    public get players(): Array<PlayerGameModel> {
        return this._players
    }

    private get stateChange(): Subject<Array<PlayerGameModel>> {
        return this._stateChange
    }

    public removePlayer(player: PlayerGameModel): void {
        for (let i = 0; i < this.players.length; i++) {
            if (this.players[i] == player) {
                this.players.splice(i, 1)

                break
            }
        }

        this.stateChange.next(this.players)
    }

    public addPlayer(player: PlayerGameModel): void {
        this.players.push(player)

        this.stateChange.next(this.players)
    }

    public getPlayer(userId: string): PlayerGameModel | undefined {
        return this.players.find((player: PlayerGameModel) => player.userId == userId)
    }

    onChange(callback: (state: Array<PlayerGameModel>) => void): Subscription {
        return this.stateChange.subscribe(callback)
    }
}