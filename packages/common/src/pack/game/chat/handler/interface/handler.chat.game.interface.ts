import { TypeChatGameEnum } from '../../type/enum/type.chat.game.enum'
/**
 * Interface qui gère le chat d'une partie
 */
export interface HandlerChatGameInterface {
    getChatType(): Array<TypeChatGameEnum>
    createChat(gameId: string): Promise<void>
}