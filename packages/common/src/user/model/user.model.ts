import { Ref } from '@typegoose/typegoose'
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
}

export const UserModelDocument = getModelForClass(UserModel, { schemaOptions: { collection: 'user' } })