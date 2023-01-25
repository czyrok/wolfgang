import { TypeChatGameEnum } from '../../type/enum/type.chat.game.enum'

export interface HandlerChatGameInterface {
    getChatType(): Array<TypeChatGameEnum>
    createChat(): Promise<void>
}