import { Exclude, Expose } from 'class-transformer'
import { TypeChatGameEnum } from '../../../../../game/chat/type/enum/type.chat.game.enum'

@Exclude()
export class MessageChatFormControllerModel {
    @Expose()
    private _text: string

    @Expose()
    private _chat?: TypeChatGameEnum

    public constructor(
        text: string,
        chat?: TypeChatGameEnum
    ) {
        this._text = text
        this._chat = chat
    }

    public get text(): string {
        return this._text
    }

    public get chat(): TypeChatGameEnum | undefined {
        return this._chat
    }
}