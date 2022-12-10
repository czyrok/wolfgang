import { CardChoosingRulesModel } from '../card/choosing/model/card-choosing.rules.model'

export class RulesGameModel {
    private _isPrivate: boolean
    private _playerCountMax: number
    private _choosingcardList: Array<CardChoosingRulesModel> = new Array()

    public constructor() {
        this._isPrivate = false
        this._playerCountMax = 8
    }

    public set isPrivate(value: boolean) {
        this._isPrivate = value
    }

    public set playerCountMax(value: number) {
        this._playerCountMax = value
    }

    public set choosingcardList(value: Array<CardChoosingRulesModel>) {
        this._choosingcardList = value
    }

    public get isPrivate(): boolean {
        return this._isPrivate
    }

    public get playerCountMax(): number {
        return this._playerCountMax
    }

    public get choosingcardList(): Array<CardChoosingRulesModel> {
        return this._choosingcardList
    }
}