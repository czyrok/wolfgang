import { prop, getModelForClass, Ref } from '@typegoose/typegoose'
import { Exclude, Expose } from 'class-transformer'

import { CollectionName } from '../../../decorator/collection-name.decorator'

import { DocumentModel } from '../../../model/document.model'
import { UserModel } from '../../../user/model/user.model'
import { CosmeticModel } from '../../model/cosmetic.model'

import { PurchaseCosmeticInterface } from '../interface/purchase.cosmetic.interface'

@Exclude()
@CollectionName()
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