import { Ref, prop, getModelForClass } from '@typegoose/typegoose'
import { Exclude, Expose } from 'class-transformer'
import { Schema } from 'mongoose'

import { DocumentModel } from '../../../model/document.model'
import { UserModel } from '../../model/user.model'

import { NotificationUserInterface } from '../interface/notification.user.interface'

import { TypeNotificationUserEnum } from '../type/enum/type.notification.user.enum'

@Exclude()
export class NotificationUserModel extends DocumentModel implements NotificationUserInterface {
    @Expose()
    @prop({ required: true, ref: () => UserModel })
    user!: Ref<UserModel>

    @Expose()
    // #achan mettre default dans constructor
    @prop({ required: true, default: Date.now() })
    releaseDate!: Date

    @Expose()
    @prop()
    translate!: string

    @Expose()
    @prop({ type: Schema.Types.Mixed, default: {} })
    data!: any

    @Expose()
    @prop()
    redirection!: string

    @Expose()
    @prop({ required: true })
    type!: TypeNotificationUserEnum
}

export const NotificationUserModelDocument = getModelForClass(NotificationUserModel, { schemaOptions: { collection: 'notification_user' } })