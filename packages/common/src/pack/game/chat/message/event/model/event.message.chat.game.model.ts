import { Exclude, Expose } from 'class-transformer'
import { prop, getModelForClass } from '@typegoose/typegoose'

import { MessageChatGameModel } from '../../model/message.chat.game.model'

import { EventMessageChatGameInterface } from '../interface/event.message.chat.game.interface'

import { TypeMessageChatGameEnum } from '../../type/enum/type.message.chat.game.enum'
import { TypeAlertEnum } from '../../../../../alert/type/enum/type.alert.enum'

@Exclude()
export class EventMessageChatGameModel extends MessageChatGameModel implements EventMessageChatGameInterface {
    @Expose()
    @prop({ required: true })
    imageUrl!: string

    @Expose()
    @prop({ required: true })
    alertType!: TypeAlertEnum

    public constructor(type: TypeMessageChatGameEnum, text: string, imageUrl: string, alertType: TypeAlertEnum) {
        super(type, text)

        this.imageUrl = imageUrl
        this.alertType = alertType
    }
}

export const EventMessageChatGameModelDocument = getModelForClass(EventMessageChatGameModel, { schemaOptions: { collection: 'event_mesage_chat_game' } })