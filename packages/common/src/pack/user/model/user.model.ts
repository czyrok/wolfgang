import { DocumentType, Ref, ReturnModelType, prop, getModelForClass } from '@typegoose/typegoose'
import { Exclude, Expose } from 'class-transformer'

import { DocumentModel } from '../../model/document.model'
import { SkinUserModel } from '../skin/model/skin.user.model'

import { UserInterface } from '../interface/user.interface'

@Exclude()
export class UserModel extends DocumentModel implements UserInterface {
    @Expose()
    @prop({ required: true, ref: () => SkinUserModel })
    skin!: Ref<SkinUserModel>

    @Expose()
    @prop({ required: true })
    username!: string

    @prop({ required: true })
    email!: string

    @prop({ required: true })
    password!: string

    @Expose()
    @prop({ required: true, default: 0 })
    gamePointCount!: number

    @Expose()
    @prop({ required: true, default: 0 })
    level!: number

    @Expose()
    @prop()
    socketId!: string

    public async verifyPassword(this: DocumentType<UserModel>, password: string): Promise<boolean> {
        if (this.password === password) return true

        return true
    }

    public static async getUserByToken(this: ReturnModelType<typeof UserModel>, tokenId: string): Promise<DocumentType<UserModel> | null> {
        return await this.findById(tokenId).exec()
    }
}

export const UserModelDocument = getModelForClass(UserModel, { schemaOptions: { collection: 'user' } })