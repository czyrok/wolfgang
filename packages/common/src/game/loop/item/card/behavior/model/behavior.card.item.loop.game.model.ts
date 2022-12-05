import { CardPlayerGameModel } from '../../../../../player/card/model/card.player.game.model'

export class BehaviorCardItemLoopGameModel{
    private _key: string
    private _campHierarchy: number
    private _timer: number
    private _cardList: Array<CardPlayerGameModel>

    public constructor(key: string, campHierarchy: number, timer: number) {
        this._key = key
        this._campHierarchy = campHierarchy
        this._timer = timer
    }

    public set key(value: string) {
        this._key = value
    }

    public set campHierarchy(value: number) {
        this._campHierarchy = value
    }

    public set timer(value: number) {
        this._timer = this.timer
    }

    public set cardList(value: Array<CardPlayerGameModel>) {
        this._cardList = value
    }

    public get key(): string {
        return this._key
    }

    public get campHierarchy(): number {
        return this._campHierarchy
    }

    public get timer(): number {
        return this._timer
    }

    public get cardList(): Array<CardPlayerGameModel> {
        return this._cardList
    }
}