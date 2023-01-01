import { Ref } from '@typegoose/typegoose'
import { Exclude, Expose } from 'class-transformer'

import { Prop, getModelForClass } from '../../../fix/typegoose.fix'

import { DocumentModel } from '../../../model/document.model'
import { CosmeticModel } from '../../../cosmetic/model/cosmetic.model'

import { SkinUserInterface } from '../interface/skin.user.interface'

@Exclude()
export class SkinUserModel extends DocumentModel implements SkinUserInterface {
    @Expose()
    @Prop({ required: true, ref: () => CosmeticModel })
    hat!: Ref<CosmeticModel>

    @Expose()
    @Prop({ required: true, ref: () => CosmeticModel })
    head!: Ref<CosmeticModel>

    @Expose()
    @Prop({ required: true, ref: () => CosmeticModel })
    top!: Ref<CosmeticModel>

    @Expose()
    @Prop({ required: true, ref: () => CosmeticModel })
    pants!: Ref<CosmeticModel>

    @Expose()
    @Prop({ required: true, ref: () => CosmeticModel })
    shoes!: Ref<CosmeticModel>

    @Expose()
    @Prop({ required: true, default: new Date() })
    lastReleaseDate!: Date
}

export const SkinUserModelDocument = getModelForClass(SkinUserModel, { schemaOptions: { collection: 'skin_user' } })