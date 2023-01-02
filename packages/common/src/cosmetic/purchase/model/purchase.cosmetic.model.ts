import { Ref } from '@typegoose/typegoose'
import { Exclude, Expose } from 'class-transformer'

import { Prop, getModelForClass } from '../../../fix/typegoose.fix'

import { DocumentModel } from '../../../model/document.model'
import { UserModel } from '../../../user/model/user.model'
import { CosmeticModel } from '../../model/cosmetic.model'

import { PurchaseCosmeticInterface } from '../interface/purchase.cosmetic.interface'

@Exclude()
export class PurchaseCosmeticModel extends DocumentModel implements PurchaseCosmeticInterface {
    @Expose()
    @Prop({ required: true, ref: () => UserModel })
    user!: Ref<UserModel>

    @Expose()
    @Prop({ required: true, ref: () => CosmeticModel })
    cosmetic!: Ref<CosmeticModel>

    @Expose()
    @Prop({ required: true, default: new Date() })
    releaseDate!: Date
}

export const PurchaseCosmeticModelDocument = getModelForClass(PurchaseCosmeticModel, { schemaOptions: { collection: 'purchase_cosmetic' } })