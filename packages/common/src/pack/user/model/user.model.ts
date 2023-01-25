import { DocumentType, Ref, prop, getModelForClass } from '@typegoose/typegoose'
import { Exclude, Expose } from 'class-transformer'

import { DocumentModel } from '../../model/document.model'
import { SkinUserModel } from '../skin/model/skin.user.model'

import { UserInterface } from '../interface/user.interface'

@Exclude()
export class UserModel extends DocumentModel implements UserInterface {
    @Expose()
    // #achan
    @prop({ /* required: true,  */ref: () => SkinUserModel })
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
    @prop({ required: true, default: null })
    currentGameId!: string | null

    public constructor(
        skin: DocumentType<SkinUserModel>,
        username: string,
        email: string,
        password: string
    ) {
        super()

        this.skin = skin
        this.username = username
        this.email = email
        this.password = password
    }

    public async verifyPassword(this: DocumentType<UserModel>, password: string): Promise<boolean> {
        if (this.password === password) return true

        return false
    }
}

export const UserModelDocument = getModelForClass(UserModel, { schemaOptions: { collection: 'user' } })