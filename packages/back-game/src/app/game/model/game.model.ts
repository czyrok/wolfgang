import { Subject, Subscription } from 'rxjs'
import { PlayerGameModel, StateGameModel } from 'common'

import { FactoryCardPlayerGameUtil } from '../player/card/factory/util/factory.card.player.game.util'

import { RulesGameModel } from '../rules/model/rules.game.model'
import { IteratorItemLoopGameModel } from '../loop/item/iterator/model/iterator.item.loop.game.model'
import { ItemLoopGameModel } from '../loop/item/model/item.loop.game.model'
import { ContextParamItemLoopGameModel } from '../loop/item/param/context/model/context.param.item.loop.game.model'
import { HandlerPlayerGameModel } from '../player/handler/model/handler.player.game.model'

import { TypeCardPlayerGameEnum } from '../player/card/type/enum/type.card.player.game.enum'

import { ResultSetItemLoopGameType } from '../loop/item/set/result/type/result.set.item.loop.game.type'

export class GameModel {
    private static _instance: GameModel = new GameModel

    private _isStarted: boolean = false
    private _state: StateGameModel = new StateGameModel
    private _stateChange: Subject<StateGameModel> = new Subject()

    private _rules: RulesGameModel = new RulesGameModel
    private _players: Array<PlayerGameModel> = new Array

    private constructor() { }

    public static get instance(): GameModel {
        return this._instance
    }

    private get stateChange(): Subject<StateGameModel> {
        return this._stateChange
    }

    public get isStarted(): boolean {
        return this._isStarted
    }

    public get state(): StateGameModel {
        return this._state
    }

    public get players(): Array<PlayerGameModel> {
        return this._players
    }

    public get rules(): RulesGameModel {
        return this._rules
    }

    public set isStarted(value: boolean) {
        this._isStarted = value
    }

    public async start(): Promise<void> {
        console.log('START67')

        // #achan
        this.isStarted = true

        FactoryCardPlayerGameUtil.get(TypeCardPlayerGameEnum.VILLAGER).addPlayer(this.players[0])
        FactoryCardPlayerGameUtil.get(TypeCardPlayerGameEnum.VILLAGER).addPlayer(this.players[1])
        FactoryCardPlayerGameUtil.get(TypeCardPlayerGameEnum.GREY_WEREWOLF).addPlayer(this.players[2])

        let ite1: IteratorItemLoopGameModel = new IteratorItemLoopGameModel

        for (let item of ite1) {
            item.objectBuildingEnd()
        }

        let ite2: IteratorItemLoopGameModel = new IteratorItemLoopGameModel

        this.turn(ite2)
    }

    private turn(ite: IteratorItemLoopGameModel, previousResult?: ResultSetItemLoopGameType): void {
        console.log('TURN79')

        // #achan

        let context: ContextParamItemLoopGameModel = new ContextParamItemLoopGameModel(undefined, previousResult)

        context.res.subscribeOne((result) => {
            this.turn(ite, result)
        })

        ite.current.entryPoint(context)
        ite.next()
    }

    public async addPlayer(username: string, socketId: string): Promise<boolean> {
        console.log('ADD_PLAYER91')

        // #achan
        if (this.rules.playerCountMax == this.players.length) return false

        let player: PlayerGameModel = new PlayerGameModel(username, socketId)

        // #achan
        this.players.push(player)
        HandlerPlayerGameModel.instance.addPlayer(player)
        this.state.players = this.players
        this.stateChange.next(this.state)

        if (this.rules.playerCountMax == this.players.length) this.start()

        return true
    }

    public onStateChange(callback: (state: StateGameModel) => void): Subscription {
        return this.stateChange.subscribe(callback)
    }
}