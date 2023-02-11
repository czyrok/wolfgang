import { Ref, prop, getModelForClass } from '@typegoose/typegoose'
import { Exclude, Expose } from 'class-transformer'

import { DocumentModel } from '../../../model/document.model'
import { UserModel } from '../../../user/model/user.model'

import { FriendRequestUserInterface } from '../interface/friend-request.user.interface'

import { AcceptationTypeFriendRequestUserEnum } from '../acceptation-type/enum/acceptation-type.friend-request.user.enum'

@Exclude()
export class FriendRequestUserModel extends DocumentModel implements FriendRequestUserInterface {
    @Expose()
    @prop({ required: true, ref: () => UserModel })
    senderUser!: Ref<UserModel>

    @Expose()
    @prop({ required: true, ref: () => UserModel })
    receiverUser!: Ref<UserModel>

    @Expose()
    // #achan mettre le default dans constructor
    @prop({ required: true, default: Date.now() })
    releaseDate!: Date

    @Expose()
    @prop({ required: true })
    acceptationType!: AcceptationTypeFriendRequestUserEnum
}

export const FriendRequestUserModelDocument = getModelForClass(FriendRequestUserModel, { schemaOptions: { collection: 'friend_request_user' } })