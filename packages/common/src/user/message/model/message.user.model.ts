import { prop, getModelForClass, Ref, modelOptions } from '@typegoose/typegoose'
import { Exclude, Expose } from 'class-transformer'

import { DocumentModel } from '../../../model/document.model'
import { UserModel } from '../../../user/model/user.model'

import { MessageUserInterface } from '../interface/message.user.interface'

@Exclude()
@modelOptions({ schemaOptions: { collection: "message_user" } })
export class MessageUserModel extends DocumentModel implements MessageUserInterface {
    @Expose()
    @prop({ required: true, ref: () => UserModel })
    senderUser!: Ref<UserModel>

    @Expose()
    @prop({ required: true, ref: () => UserModel })
    receiverUser!: Ref<UserModel>

    @Expose()
    @prop({ required: true, default: new Date() })
    releaseDate!: Date

    @Expose()
    @prop({ required: true })
    message!: string
}

export const MessageUserModelDocument = getModelForClass(MessageUserModel)