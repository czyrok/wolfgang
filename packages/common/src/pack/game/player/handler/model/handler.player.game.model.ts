import { Subject, Subscription } from 'rxjs'

import { PlayerGameModel } from '../../model/player.game.model'

import { ChangeInterface } from '../../../change/interface/change.interface'

/**
 * Classe qui gère les joueurs d'une partie
 */
export class HandlerPlayerGameModel implements ChangeInterface<Array<PlayerGameModel>> {
    private static _instance: HandlerPlayerGameModel = new HandlerPlayerGameModel

    private _players: Array<PlayerGameModel> = new Array
    private _stateChange: Subject<Array<PlayerGameModel>> = new Subject()

    /**
     * Constructeur
     */
    private constructor() { }

    /**
     * Récupère l'instance de la partie
     * @returns Renvoie l'instance de la partie
     */
    public static get instance(): HandlerPlayerGameModel {
        return this._instance
    }

    /**
     * Récupère la liste des joueurs de la partie
     * @returns Renvoie la liste des joueurs de la partie
     */
    public get players(): Array<PlayerGameModel> {
        return this._players
    }

    /**
     * 
     */
    private get stateChange(): Subject<Array<PlayerGameModel>> {
        return this._stateChange
    }

    /**
     * Fonction qui supprime un joueur d'une partie
     * @param player Joueur
     */
    public removePlayer(player: PlayerGameModel): void {
        for (let i = 0; i < this.players.length; i++) {
            if (this.players[i] == player) {
                this.players.splice(i, 1)

                break
            }
        }

        this.stateChange.next(this.players)
    }

    /**
     * Fonction qui ajoute un joueur dans la partie
     * @param player Joueur
     */
    public addPlayer(player: PlayerGameModel): void {
        this.players.push(player)

        this.stateChange.next(this.players)
    }

    /**
     * Fonction qui renvoie le joueur dont son id est passé en paramètre
     * @param userId Id du joueur
     * @returns Renvoie le joueur
     */
    public getPlayer(userId: string): PlayerGameModel | undefined {
        return this.players.find((player: PlayerGameModel) => player.user._id === userId)
    }

    /**
     * 
     * @param callback 
     * @returns 
     */
    onChange(callback: (state: Array<PlayerGameModel>) => void): Subscription {
        return this.stateChange.subscribe(callback)
    }
}