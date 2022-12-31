import { Exclude, Expose } from 'class-transformer'
import { FactoryCardGameUtil } from '../../card/factory/util/factory.card.game.util'
import { TypeCardGameEnum } from '../../card/type/enum/type.card.game.enum'
import { CardChoosingRulesModel } from '../card/choosing/model/card-choosing.rules.model'

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
        this.choosingcardList.push(new CardChoosingRulesModel(FactoryCardGameUtil.get(TypeCardGameEnum.VILLAGER), 2))
        this.choosingcardList.push(new CardChoosingRulesModel(FactoryCardGameUtil.get(TypeCardGameEnum.GREY_WEREWOLF), 1))
    }

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