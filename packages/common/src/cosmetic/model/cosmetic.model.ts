import { Exclude, Expose } from 'class-transformer'

import { Prop, getModelForClass } from '../../fix/typegoose.fix'

import { DocumentModel } from '../../model/document.model'

import { CosmeticInterface } from '../interface/cosmetic.interface'

import { TypeCosmeticEnum } from '../type/enum/type.cosmetic.enum'

@Exclude()
export class CosmeticModel extends DocumentModel implements CosmeticInterface {
    @Expose()
    @Prop({ required: true })
    translateName!: string

    @Expose()
    @Prop({ required: true })
    gamePointPrice!: string

    @Expose()
    @Prop({ required: true })
    imageUrl!: string

    @Expose()
    @Prop({ required: true })
    type!: TypeCosmeticEnum
}

export const CosmeticModelDocument = getModelForClass(CosmeticModel, { schemaOptions: { collection: 'cosmetic' } })