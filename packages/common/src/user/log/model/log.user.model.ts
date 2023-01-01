import { Ref } from '@typegoose/typegoose'
import { Exclude, Expose } from 'class-transformer'
import { Schema } from 'mongoose'

import { Prop, getModelForClass } from '../../../fix/typegoose.fix'

import { DocumentModel } from '../../../model/document.model'
import { UserModel } from '../../model/user.model'

import { LogUserInterface } from '../interface/log.user.interface'

import { TypeLogUserEnum } from '../type/enum/type.log.user.enum'

@Exclude()
export class LogUserModel extends DocumentModel implements LogUserInterface {
    @Expose()
    @Prop({ required: true, ref: () => UserModel })
    users!: Array<Ref<UserModel>>

    @Expose()
    @Prop({ required: true, default: new Date() })
    releaseDate!: Date

    @Expose()
    @Prop({ type: Schema.Types.Mixed, default: {} })
    data!: any

    @Expose()
    @Prop({ required: true })
    type!: TypeLogUserEnum
}

export const LogUserModelDocument = getModelForClass(LogUserModel, { schemaOptions: { collection: 'log_user' } })