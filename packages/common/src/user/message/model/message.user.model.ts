import { Ref } from '@typegoose/typegoose'
import { Exclude, Expose } from 'class-transformer'

import { Prop, getModelForClass } from '../../../fix/typegoose.fix'

import { DocumentModel } from '../../../model/document.model'
import { UserModel } from '../../../user/model/user.model'

import { MessageUserInterface } from '../interface/message.user.interface'

@Exclude()
export class MessageUserModel extends DocumentModel implements MessageUserInterface {
    @Expose()
    @Prop({ required: true, ref: () => UserModel })
    senderUser!: Ref<UserModel>

    @Expose()
    @Prop({ required: true, ref: () => UserModel })
    receiverUser!: Ref<UserModel>

    @Expose()
    @Prop({ required: true, default: new Date() })
    releaseDate!: Date

    @Expose()
    @Prop({ required: true })
    message!: string
}

export const MessageUserModelDocument = getModelForClass(MessageUserModel, { schemaOptions: { collection: 'message_user' } })