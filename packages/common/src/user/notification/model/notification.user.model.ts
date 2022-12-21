import { prop, getModelForClass, Ref, modelOptions } from '@typegoose/typegoose'
import { Exclude, Expose } from 'class-transformer'

import { DocumentModel } from '../../../model/document.model'
import { UserModel } from '../../model/user.model'

import { NotificationUserInterface } from '../interface/notification.user.interface'

import { TypeNotificationUserEnum } from '../type/enum/type.notification.user.enum'

@Exclude()
@modelOptions({ schemaOptions: { collection: "notification_user" } })
export class NotificationUserModel extends DocumentModel implements NotificationUserInterface {
    @Expose()
    @prop({ required: true, ref: () => UserModel })
    user!: Ref<UserModel>

    @Expose()
    @prop({ required: true, default: new Date() })
    releaseDate!: Date

    @Expose()
    @prop()
    translate!: string

    @Expose()
    @prop({ default: {} })
    data!: any

    @Expose()
    @prop()
    redirection!: string

    @Expose()
    @prop({ required: true })
    type!: TypeNotificationUserEnum
}

export const NotificationUserModelDocument = getModelForClass(NotificationUserModel)