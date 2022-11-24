import { prop, getModelForClass, Ref } from '@typegoose/typegoose'
import { Exclude, Expose } from 'class-transformer'

import { CollectionName } from '../../../decorator/collection-name.decorator'

import { DocumentModel } from '../../../model/document.model'
import { UserModel } from '../../../user/model/user.model'

import { MessageUserInterface } from '../interface/message.user.interface'

@Exclude()
@CollectionName()
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