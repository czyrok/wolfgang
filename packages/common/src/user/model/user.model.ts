import { DocumentType, Ref, ReturnModelType } from '@typegoose/typegoose'
import { Exclude, Expose } from 'class-transformer'

import { Prop, getModelForClass } from '../../fix/typegoose.fix'

import { DocumentModel } from '../../model/document.model'
import { SkinUserModel } from '../skin/model/skin.user.model'

import { UserInterface } from '../interface/user.interface'

@Exclude()
export class UserModel extends DocumentModel implements UserInterface {
    @Expose()
    @Prop({ required: true, ref: () => SkinUserModel })
    skin!: Ref<SkinUserModel>

    @Expose()
    @Prop({ required: true })
    username!: string

    @Prop({ required: true })
    email!: string

    @Prop({ required: true })
    password!: string

    @Expose()
    @Prop({ required: true, default: 0 })
    gamePointCount!: number

    @Expose()
    @Prop({ required: true, default: 0 })
    level!: number

    @Expose()
    @Prop()
    socketId!: string

    public async verifyPassword(this: DocumentType<UserModel>, password: string): Promise<boolean> {
        if (this.password === password) return true

        return true
    }

    public static async getUserByToken(this: ReturnModelType<typeof UserModel>, tokenId: string): Promise<DocumentType<UserModel> | null> {
        return await this.findById(tokenId).populate('user').exec()
    }
}

export const UserModelDocument = getModelForClass(UserModel, { schemaOptions: { collection: 'user' } })