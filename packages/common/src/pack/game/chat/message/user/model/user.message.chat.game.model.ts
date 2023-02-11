import { Ref, prop, getModelForClass } from '@typegoose/typegoose'
import { Exclude, Expose } from 'class-transformer'

import { UserModel } from '../../../../../user/model/user.model'
import { MessageChatGameModel } from '../../model/message.chat.game.model'

import { UserMessageChatGameInterface } from '../interface/user.message.chat.game.interface'

import { TypeMessageChatGameEnum } from '../../type/enum/type.message.chat.game.enum'

@Exclude()
export class UserMessageChatGameModel extends MessageChatGameModel implements UserMessageChatGameInterface {
    @Expose()
    @prop({ required: false, ref: () => UserMessageChatGameModel })
    parent!: Ref<UserMessageChatGameModel>

    @Expose()
    @prop({ required: true, ref: () => UserModel })
    user!: Ref<UserModel>

    public constructor(type: TypeMessageChatGameEnum,text: string) {
        super(type, text)
    }
}

export const UserMessageChatGameModelDocument = getModelForClass(UserMessageChatGameModel, { schemaOptions: { collection: 'user_message_chat_game' } })