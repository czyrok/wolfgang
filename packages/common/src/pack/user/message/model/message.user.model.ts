import { Ref, prop, getModelForClass } from '@typegoose/typegoose'
import { Exclude, Expose } from 'class-transformer'

import { DocumentModel } from '../../../model/document.model'
import { UserModel } from '../../../user/model/user.model'

import { MessageUserInterface } from '../interface/message.user.interface'

@Exclude()
export class MessageUserModel extends DocumentModel implements MessageUserInterface {
    @Expose()
    @prop({ required: true, ref: () => UserModel })
    senderUser!: Ref<UserModel>

    @Expose()
    @prop({ required: true, ref: () => UserModel })
    receiverUser!: Ref<UserModel>

    @Expose()
    // #achan mettre default dans constructor
    @prop({ required: true, default: Date.now() })
    releaseDate!: Date

    @Expose()
    @prop({ required: true })
    message!: string
}

export const MessageUserModelDocument = getModelForClass(MessageUserModel, { schemaOptions: { collection: 'message_user' } })