import { prop, getModelForClass, Ref, modelOptions } from '@typegoose/typegoose'
import { Exclude, Expose } from 'class-transformer'

import { UserModel } from '../../../../../user/model/user.model'
import { MessageChatGameModel } from '../../model/message.chat.game.model'

import { UserMessageChatGameInterface } from '../interface/user.message.chat.game.interface'

@Exclude()
@modelOptions({ schemaOptions: { collection: "user_message_chat_game" } })
export class UserMessageChatGameModel extends MessageChatGameModel implements UserMessageChatGameInterface {
    @Expose()
    @prop({ required: false, ref: () => UserMessageChatGameModel })
    parent!: Ref<UserMessageChatGameModel>

    @Expose()
    @prop({ required: true, ref: () => UserModel })
    user!: Ref<UserModel>

}

export const UserMessageChatGameModelDocument = getModelForClass(UserMessageChatGameModel)