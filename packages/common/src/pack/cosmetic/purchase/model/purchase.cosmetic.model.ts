import { Ref, prop, getModelForClass } from '@typegoose/typegoose'
import { Exclude, Expose } from 'class-transformer'

import { DocumentModel } from '../../../model/document.model'
import { UserModel } from '../../../user/model/user.model'
import { CosmeticModel } from '../../model/cosmetic.model'

import { PurchaseCosmeticInterface } from '../interface/purchase.cosmetic.interface'

@Exclude()
export class PurchaseCosmeticModel extends DocumentModel implements PurchaseCosmeticInterface {
    @Expose()
    @prop({ required: true, ref: () => UserModel })
    user!: Ref<UserModel>

    @Expose()
    @prop({ required: true, ref: () => CosmeticModel })
    cosmetic!: Ref<CosmeticModel>

    @Expose()
    @prop({ required: true, default: Date.now() })
    releaseDate!: Date
}

export const PurchaseCosmeticModelDocument = getModelForClass(PurchaseCosmeticModel, { schemaOptions: { collection: 'purchase_cosmetic' } })