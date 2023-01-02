import { Ref } from '@typegoose/typegoose'
import { Exclude, Expose } from 'class-transformer'

import { Prop, getModelForClass } from '../../../fix/typegoose.fix'

import { DocumentModel } from '../../../model/document.model'
import { UserModel } from '../../../user/model/user.model'

import { FriendRequestUserInterface } from '../interface/friend-request.user.interface'

import { AcceptationTypeFriendRequestUserEnum } from '../acceptation-type/enum/acceptation-type.friend-request.user.enum'

@Exclude()
export class FriendRequestUserModel extends DocumentModel implements FriendRequestUserInterface {
    @Expose()
    @Prop({ required: true, ref: () => UserModel })
    senderUser!: Ref<UserModel>

    @Expose()
    @Prop({ required: true, ref: () => UserModel })
    receiverUser!: Ref<UserModel>

    @Expose()
    @Prop({ required: true, default: new Date() })
    releaseDate!: Date

    @Expose()
    @Prop({ required: true })
    acceptationType!: AcceptationTypeFriendRequestUserEnum
}

export const FriendRequestUserModelDocument = getModelForClass(FriendRequestUserModel, { schemaOptions: { collection: 'friend_request_user' } })