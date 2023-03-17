import { TypeChatGameEnum } from '../type/enum/type.chat.game.enum'

/**
 * Interface qui créer un chat
 */
export interface ChatGameInterface {
    gameId: string
    type: TypeChatGameEnum
}