import { Ref, prop, getModelForClass, DocumentType } from '@typegoose/typegoose'
import { Exclude, Expose } from 'class-transformer'

import { UserModel } from '../../../../../user/model/user.model'
import { MessageChatGameModel } from '../../model/message.chat.game.model'

import { UserMessageChatGameInterface } from '../interface/user.message.chat.game.interface'

@Exclude()
export class UserMessageChatGameModel extends MessageChatGameModel implements UserMessageChatGameInterface {
    @Expose()
    @prop({ required: false, ref: () => UserMessageChatGameModel })
    parent!: Ref<UserMessageChatGameModel>

    @Expose()
    @prop({ required: true, ref: () => UserModel })
    user!: Ref<UserModel>

    public constructor(text: string) {
        super(text)
    }
}

export const UserMessageChatGameModelDocument = getModelForClass(UserMessageChatGameModel, { schemaOptions: { collection: 'user_message_chat_game' } })