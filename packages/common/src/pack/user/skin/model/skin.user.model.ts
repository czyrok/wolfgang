import { Ref, prop, getModelForClass, DocumentType } from '@typegoose/typegoose'
import { Exclude, Expose } from 'class-transformer'

import { DocumentModel } from '../../../model/document.model'
import { CosmeticModel } from '../../../cosmetic/model/cosmetic.model'

import { SkinUserInterface } from '../interface/skin.user.interface'
import { TypeCosmeticEnum } from '../../../cosmetic/type/enum/type.cosmetic.enum'

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

    public async setCosmetic(this: DocumentType<SkinUserModel>, cosmetic: DocumentType<CosmeticModel>): Promise<void> {
        switch (cosmetic.type) {
            case TypeCosmeticEnum.HAT:
                this.hat = cosmetic
                break
            case TypeCosmeticEnum.HEAD:
                this.head = cosmetic
                break
            case TypeCosmeticEnum.TOP:
                this.top = cosmetic
                break
            case TypeCosmeticEnum.PANTS:
                this.pants = cosmetic
                break
            case TypeCosmeticEnum.SHOES:
                this.shoes = cosmetic
                break
        }
    }
}

export const SkinUserModelDocument = getModelForClass(SkinUserModel, { schemaOptions: { collection: 'skin_user' } })