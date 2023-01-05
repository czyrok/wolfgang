import { CardGameModel } from '../../../../card/model/card.game.model'

export class CardChoosingRulesModel {
    public constructor(
        private _card: CardGameModel,
        private _count: number
    ) { }

    public set count(value: number) {
        this._count = value
    }

    public get card(): CardGameModel {
        return this._card
    }

    public get count(): number {
        return this._count
    }
}