import { CosmeticModel } from 'common'

export class ListSkinCustomizationProfileMainModel{
    private _hat: Array<CosmeticModel>
    private _head: Array<CosmeticModel>
    private _top: Array<CosmeticModel>
    private _pants: Array<CosmeticModel>
    private _shoes: Array<CosmeticModel>

    public constructor(hat: Array<CosmeticModel>, head: Array<CosmeticModel>, top: Array<CosmeticModel>, pants: Array<CosmeticModel>, shoes: Array<CosmeticModel>, ) {
        this._hat = hat
        this._head = head
        this._top = top
        this._pants = pants
        this._shoes = shoes
    }

    public set hatList(value: Array<CosmeticModel>) {
        this._hat = value
    }

    public get hatList(): Array<CosmeticModel>{
        return this._hat
    }

    public set headList(value: Array<CosmeticModel>) {
        this._head = value
    }

    public get headList(): Array<CosmeticModel>{
        return this._head
    }

    public set topList(value: Array<CosmeticModel>) {
        this._top = value
    }

    public get topList(): Array<CosmeticModel>{
        return this._top
    }

    public set pantsList(value: Array<CosmeticModel>) {
        this._pants = value
    }

    public get pantsList(): Array<CosmeticModel>{
        return this._pants
    }

    public set shoesList(value: Array<CosmeticModel>) {
        this._shoes = value
    }

    public get shoesList(): Array<CosmeticModel>{
        return this._shoes
    }
}