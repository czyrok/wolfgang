import { TypeMessageChatGameEnum } from '../type/enum/type.message.chat.game.enum'

/**
 * Interface qui contient les informations sur le message
 */
export interface MessageChatGameInterface {
    text: string
    releaseDate: Date
    type: TypeMessageChatGameEnum
}