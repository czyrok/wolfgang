import { Ref, prop, getModelForClass } from '@typegoose/typegoose'
import { Exclude, Expose } from 'class-transformer'

import { DocumentModel } from '../../../model/document.model'
import { CosmeticModel } from '../../../cosmetic/model/cosmetic.model'

import { SkinUserInterface } from '../interface/skin.user.interface'

@Exclude()
export class SkinUserModel extends DocumentModel implements SkinUserInterface {
    @Expose()
    @prop({ required: true, ref: () => CosmeticModel })
    hat!: Ref<CosmeticModel>

    @Expose()
    @prop({ required: true, ref: () => CosmeticModel })
    head!: Ref<CosmeticModel>

    @Expose()
    @prop({ required: true, ref: () => CosmeticModel })
    top!: Ref<CosmeticModel>

    @Expose()
    @prop({ required: true, ref: () => CosmeticModel })
    pants!: Ref<CosmeticModel>

    @Expose()
    @prop({ required: true, ref: () => CosmeticModel })
    shoes!: Ref<CosmeticModel>

    @Expose()
    @prop({ required: true, default: new Date() })
    lastReleaseDate!: Date
}

export const SkinUserModelDocument = getModelForClass(SkinUserModel, { schemaOptions: { collection: 'skin_user' } })