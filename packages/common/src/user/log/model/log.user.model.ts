import { prop, getModelForClass, Ref } from '@typegoose/typegoose'
import { Exclude, Expose } from 'class-transformer'

import { CollectionName } from '../../../decorator/collection-name.decorator'

import { DocumentModel } from '../../../model/document.model'
import { UserModel } from '../../model/user.model'

import { LogUserInterface } from '../interface/log.user.interface'

import { TypeLogUserEnum } from '../type/enum/type.log.user.enum'

@Exclude()
@CollectionName()
export class LogUserModel extends DocumentModel implements LogUserInterface {
    @Expose()
    @prop({ required: true, ref: () => UserModel })
    users!: Array<Ref<UserModel>>

    @Expose()
    @prop({ required: true, default: new Date() })
    releaseDate!: Date

    @Expose()
    @prop({ default: {} })
    data!: any

    @Expose()
    @prop({ required: true })
    type!: TypeLogUserEnum
}

export const LogUserModelDocument = getModelForClass(LogUserModel)