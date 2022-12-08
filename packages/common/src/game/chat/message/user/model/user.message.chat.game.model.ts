import { prop, getModelForClass, Ref } from '@typegoose/typegoose'
import { Exclude, Expose } from 'class-transformer'

import { CollectionName } from '../../../../../decorator/collection-name.decorator'
import { MessageChatGameModel } from '../../model/message.chat.game.model'
import { UserMessageChatGameInterface } from '../interface/user.message.chat.game.interface'

@Exclude()
@CollectionName()
export class UserMessageChatGameModel extends MessageChatGameModel implements UserMessageChatGameInterface {
    @Expose()
    @prop({ required: false, ref: () => UserMessageChatGameModel })
    parent!: Ref<UserMessageChatGameModel>

}

export const UserMessageChatGameModelDocument = getModelForClass(UserMessageChatGameModel)