import { CardChoosingRulesModel } from '../card/choosing/model/card-choosing.rules.model'

export class RulesGameModel {
    private _id!: string
    private _isPrivate!: boolean
    private _playerCountMax!: number
    private _choosingcardList!: Array<CardChoosingRulesModel>

    public constructor(id: string, isPrivate: boolean, playerCountMax: number) {
        this._id = id
        this._isPrivate = isPrivate
        this._playerCountMax = playerCountMax
    }

    public set id(value: string) {
        this._id = value
    }

    public set isPrivate(value: boolean) {
        this._isPrivate = value
    }

    public set playerCountMax(value: number) {
        this._playerCountMax = value
    }

    public get id(): string {
        return this._id
    }

    public get isPrivate(): boolean {
        return this._isPrivate
    }

    public get playerCountMax(): number {
        return this._playerCountMax
    }
}