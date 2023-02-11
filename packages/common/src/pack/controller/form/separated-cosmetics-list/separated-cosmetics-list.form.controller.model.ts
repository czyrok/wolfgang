import { Exclude, Expose } from 'class-transformer'
import { CosmeticModel } from '../../../cosmetic/model/cosmetic.model'

@Exclude()
export class SeparatedCosmeticsListFormControllerModel {
    @Expose()
    private _ownedCosmetics!: Array<CosmeticModel>

    @Expose()
    private _notOwnedCosmetics!: Array<CosmeticModel>

    public constructor(
        ownedCosmetics: Array<CosmeticModel>,
        notOwnedCosmetics: Array<CosmeticModel>
    ) {
        this._ownedCosmetics = ownedCosmetics
        this._notOwnedCosmetics = notOwnedCosmetics
    }

    @Expose()
    public get ownedCosmetics(): Array<CosmeticModel> {
        return this._ownedCosmetics
    }

    @Expose()
    public get notOwnedCosmetics(): Array<CosmeticModel> {
        return this._notOwnedCosmetics
    }
}