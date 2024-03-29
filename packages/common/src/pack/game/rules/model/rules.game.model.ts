import { Exclude, Expose } from 'class-transformer'

import { FactoryCardGameModel } from '../../card/factory/model/factory.card.game.model'
import { CardChoosingRulesModel } from '../card/choosing/model/card-choosing.rules.model'

import { TypeCardGameEnum } from '../../card/type/enum/type.card.game.enum'

@Exclude()
export class RulesGameModel {
    @Expose()
    private _isPrivate: boolean = false

    @Expose()
    // #achan
    private _playerCountMax: number = 3

    @Expose()
    private _choosingcardList: Array<CardChoosingRulesModel> = new Array

    public constructor() {
        // #achan
        this.choosingcardList.push(new CardChoosingRulesModel(FactoryCardGameModel.instance.get(TypeCardGameEnum.VILLAGER), 2))
        this.choosingcardList.push(new CardChoosingRulesModel(FactoryCardGameModel.instance.get(TypeCardGameEnum.GREY_WEREWOLF), 1))
    }

    public set isPrivate(value: boolean) {
        this._isPrivate = value
    }

    public set playerCountMax(value: number) {
        this._playerCountMax = value
    }

    @Expose()
    public get isPrivate(): boolean {
        return this._isPrivate
    }

    @Expose()
    public get playerCountMax(): number {
        return this._playerCountMax
    }

    @Expose()
    public get choosingcardList(): Array<CardChoosingRulesModel> {
        return this._choosingcardList
    }
}