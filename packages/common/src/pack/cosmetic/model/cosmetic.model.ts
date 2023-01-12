import { Exclude, Expose } from 'class-transformer'
import { prop, getModelForClass } from '@typegoose/typegoose'

import { DocumentModel } from '../../model/document.model'

import { CosmeticInterface } from '../interface/cosmetic.interface'

import { TypeCosmeticEnum } from '../type/enum/type.cosmetic.enum'

@Exclude()
export class CosmeticModel extends DocumentModel implements CosmeticInterface {
    @Expose()
    @prop({ required: true })
    translateName!: string

    @Expose()
    @prop({ required: true })
    gamePointPrice!: number

    @Expose()
    @prop({ required: true })
    imageUrl!: string

    @Expose()
    @prop({ required: true })
    type!: TypeCosmeticEnum
}

export const CosmeticModelDocument = getModelForClass(CosmeticModel, { schemaOptions: { collection: 'cosmetic' } })