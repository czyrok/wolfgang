import { Ref } from '@typegoose/typegoose'
import { Exclude, Expose } from 'class-transformer'

import { Prop, getModelForClass } from '../../../../../fix/typegoose.fix'

import { UserModel } from '../../../../../user/model/user.model'
import { MessageChatGameModel } from '../../model/message.chat.game.model'

import { UserMessageChatGameInterface } from '../interface/user.message.chat.game.interface'

@Exclude()
export class UserMessageChatGameModel extends MessageChatGameModel implements UserMessageChatGameInterface {
    @Expose()
    @Prop({ required: false, ref: () => UserMessageChatGameModel })
    parent!: Ref<UserMessageChatGameModel>

    @Expose()
    @Prop({ required: true, ref: () => UserModel })
    user!: Ref<UserModel>

}

export const UserMessageChatGameModelDocument = getModelForClass(UserMessageChatGameModel, { schemaOptions: { collection: 'user_message_chat_game' } })