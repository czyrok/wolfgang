import { prop, getModelForClass, Ref } from '@typegoose/typegoose'
import { Exclude, Expose } from 'class-transformer'

import { CollectionName } from '../../decorator/collection-name.decorator'

import { DocumentModel } from '../../model/document.model'
import { SkinUserModel } from '../skin/model/skin.user.model'

import { UserInterface } from '../interface/user.interface'

@Exclude()
@CollectionName()
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
}

export const UserModelDocument = getModelForClass(UserModel)