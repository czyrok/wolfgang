import { TypeMessageChatGameEnum } from '../type/enum/type.message.chat.game.enum'

export interface MessageChatGameInterface {
    text: string
    releaseDate: Date
    type: TypeMessageChatGameEnum
}