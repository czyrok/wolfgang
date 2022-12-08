import { prop, getModelForClass } from '@typegoose/typegoose'
import { Exclude, Expose } from 'class-transformer'

import { CollectionName } from '../../decorator/collection-name.decorator'

import { DocumentModel } from '../../model/document.model'

import { CosmeticInterface } from '../interface/cosmetic.interface'

import { TypeCosmeticEnum } from '../type/enum/type.cosmetic.enum'

@Exclude()
@CollectionName()
export class CosmeticModel extends DocumentModel implements CosmeticInterface {
    @Expose()
    @prop({ required: true })
    translateName!: string

    @Expose()
    @prop({ required: true })
    gamePointPrice!: string

    @Expose()
    @prop({ required: true })
    imageUrl!: string

    @Expose()
    @prop({ required: true })
    type!: TypeCosmeticEnum
}

export const CosmeticModelDocument = getModelForClass(CosmeticModel)