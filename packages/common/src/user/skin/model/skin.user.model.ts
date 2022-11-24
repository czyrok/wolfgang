import { prop, getModelForClass, Ref } from '@typegoose/typegoose'
import { Exclude, Expose } from 'class-transformer'

import { CollectionName } from '../../../decorator/collection-name.decorator'

import { DocumentModel } from '../../../model/document.model'
import { CosmeticModel } from '../../../cosmetic/model/cosmetic.model'

import { SkinUserInterface } from '../interface/skin.user.interface'

@Exclude()
@CollectionName()
export class SKinUserModel extends DocumentModel implements SkinUserInterface {
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
    shoe!: Ref<CosmeticModel>

    @Expose()
    @prop({ required: true, default: new Date() })
    lastReleaseDate!: Date
}

export const SKinUserModelDocument = getModelForClass(SKinUserModel)