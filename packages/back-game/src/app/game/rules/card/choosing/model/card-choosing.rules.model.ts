import { CardPlayerGameModel } from "../../../../player/card/model/card.player.game.model"

export class CardChoosingRulesModel {
    private _card: CardPlayerGameModel
    private _count: number

    public constructor(card: CardPlayerGameModel, count: number) {
        this._card = card
        this._count = count
    }

    public set card(value: CardPlayerGameModel) {
        this._card = value
    }

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