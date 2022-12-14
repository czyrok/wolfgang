import { CardPlayerGameModel } from 'common'

export class CardChoosingRulesModel {
    public constructor(
        private _card: CardPlayerGameModel,
        private _count: number
    ) { }

    public set count(value: number) {
        this._count = value
    }

    public get card(): CardPlayerGameModel {
        return this._card
    }

    public get count(): number {
        return this._count
    }
}