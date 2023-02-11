import { Ref, prop, getModelForClass, DocumentType } from '@typegoose/typegoose'
import { Exclude, Expose } from 'class-transformer'

import { DocumentModel } from '../../../model/document.model'
import { CosmeticModel } from '../../../cosmetic/model/cosmetic.model'

import { SkinUserInterface } from '../interface/skin.user.interface'
import { TypeCosmeticEnum } from '../../../cosmetic/type/enum/type.cosmetic.enum'

@Exclude()
export class SkinUserModel extends DocumentModel implements SkinUserInterface {
    public constructor(hat: DocumentType<CosmeticModel> | null,
        head: DocumentType<CosmeticModel> | null,
        top: DocumentType<CosmeticModel> | null,
        pants: DocumentType<CosmeticModel> | null,
        shoes: DocumentType<CosmeticModel> | null) {
        super()
        if (hat !== null) this.hat = hat
        if (head !== null) this.head = head
        if (top !== null) this.top = top
        if (pants !== null) this.pants = pants
        if (shoes !== null) this.shoes = shoes
    }

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
                await this.updateOne({ hat: cosmetic }).exec()
                break
            case TypeCosmeticEnum.HEAD:
                this.head = cosmetic
                await this.updateOne({ head: cosmetic }).exec()
                break
            case TypeCosmeticEnum.TOP:
                this.top = cosmetic
                await this.updateOne({ top: cosmetic }).exec()
                break
            case TypeCosmeticEnum.PANTS:
                this.pants = cosmetic
                await this.updateOne({ pants: cosmetic }).exec()
                break
            case TypeCosmeticEnum.SHOES:
                this.shoes = cosmetic
                await this.updateOne({ shoes: cosmetic }).exec()
                break
        }

        await this.updateOne({ lastReleaseDate: new Date }).exec()

        await this.save()
    }
}

export const SkinUserModelDocument = getModelForClass(SkinUserModel, { schemaOptions: { collection: 'skin_user' } })