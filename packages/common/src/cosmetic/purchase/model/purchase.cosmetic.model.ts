import { prop, getModelForClass, Ref, modelOptions } from '@typegoose/typegoose'
import { Exclude, Expose } from 'class-transformer'

import { DocumentModel } from '../../../model/document.model'
import { UserModel } from '../../../user/model/user.model'
import { CosmeticModel } from '../../model/cosmetic.model'

import { PurchaseCosmeticInterface } from '../interface/purchase.cosmetic.interface'

@Exclude()
@modelOptions({ schemaOptions: { collection: "purchase_cosmetic" } })
export class PurchaseCosmeticModel extends DocumentModel implements PurchaseCosmeticInterface {
    @Expose()
    @prop({ required: true, ref: () => UserModel })
    user!: Ref<UserModel>

    @Expose()
    @prop({ required: true, ref: () => CosmeticModel })
    cosmetic!: Ref<CosmeticModel>

    @Expose()
    @prop({ required: true, default: new Date() })
    releaseDate!: Date
}

export const PurchaseCosmeticModelDocument = getModelForClass(PurchaseCosmeticModel)