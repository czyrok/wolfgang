import { CardChoosingRulesModel } from '../card/choosing/model/card-choosing.rules.model'

export class RulesGameModel {
    private _isPrivate: boolean = false
    // #achan
    private _playerCountMax: number = 3
    private _choosingcardList: Array<CardChoosingRulesModel> = new Array

    public set isPrivate(value: boolean) {
        this._isPrivate = value
    }

    public set playerCountMax(value: number) {
        this._playerCountMax = value
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