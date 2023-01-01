import { Ref } from '@typegoose/typegoose'
import { Exclude, Expose } from 'class-transformer'

import { Prop, getModelForClass } from '../../../fix/typegoose.fix'

import { DocumentModel } from '../../../model/document.model'
import { UserModel } from '../../model/user.model'

import { NotificationUserInterface } from '../interface/notification.user.interface'

import { TypeNotificationUserEnum } from '../type/enum/type.notification.user.enum'

@Exclude()
export class NotificationUserModel extends DocumentModel implements NotificationUserInterface {
    @Expose()
    @Prop({ required: true, ref: () => UserModel })
    user!: Ref<UserModel>

    @Expose()
    @Prop({ required: true, default: new Date() })
    releaseDate!: Date

    @Expose()
    @Prop()
    translate!: string

    @Expose()
    @Prop({ default: {} })
    data!: any

    @Expose()
    @Prop()
    redirection!: string

    @Expose()
    @Prop({ required: true })
    type!: TypeNotificationUserEnum
}

export const NotificationUserModelDocument = getModelForClass(NotificationUserModel, { schemaOptions: { collection: 'notification_user' } })