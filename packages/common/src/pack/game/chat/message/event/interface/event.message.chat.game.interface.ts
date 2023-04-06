import { MessageChatGameInterface } from '../../interface/message.chat.game.interface'

/**
 * Interface qui contient le nom de l'image du message
 */
export interface EventMessageChatGameInterface extends MessageChatGameInterface {
    imageUrl: string
}