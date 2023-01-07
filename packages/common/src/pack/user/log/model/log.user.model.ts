import { Ref, prop, getModelForClass } from '@typegoose/typegoose'
import { Exclude, Expose } from 'class-transformer'
import { Schema } from 'mongoose'

import { DocumentModel } from '../../../model/document.model'
import { UserModel } from '../../model/user.model'

import { LogUserInterface } from '../interface/log.user.interface'

import { TypeLogUserEnum } from '../type/enum/type.log.user.enum'

@Exclude()
export class LogUserModel extends DocumentModel implements LogUserInterface {
    @Expose()
    @prop({ required: true, ref: () => UserModel })
    users!: Array<Ref<UserModel>>

    @Expose()
    @prop({ required: true, default: new Date() })
    releaseDate!: Date

    @Expose()
    @prop({ type: Schema.Types.Mixed, default: {} })
    data!: any

    @Expose()
    @prop({ required: true })
    type!: TypeLogUserEnum
}

export const LogUserModelDocument = getModelForClass(LogUserModel, { schemaOptions: { collection: 'log_user' } })