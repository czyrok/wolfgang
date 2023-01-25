import { Exclude, Expose } from 'class-transformer'
import { TypeChatGameEnum } from '../../../../../game/chat/type/enum/type.chat.game.enum'

@Exclude()
export class MessageChatFormControllerModel {
    @Expose()
    private _chat: TypeChatGameEnum

    @Expose()
    private _text: string

    public constructor(
        chat: TypeChatGameEnum,
        text: string
    ) {
        this._chat = chat
        this._text = text
    }

    public get chat(): TypeChatGameEnum {
        return this._chat
    }

    public get text(): string {
        return this._text
    }
}