import { prop, getModelForClass, Ref } from '@typegoose/typegoose'
import { Exclude, Expose } from 'class-transformer'

import { CollectionName } from '../../../decorator/collection-name.decorator'

import { DocumentModel } from '../../../model/document.model'
import { UserModel } from '../../../user/model/user.model'

import { FriendRequestUserInterface } from '../interface/friend-request.user.interface'

import { AcceptationTypeFriendRequestUserEnum } from '../acceptation-type/enum/acceptation-type.friend-request.user.enum'

@Exclude()
@CollectionName()
export class FriendRequestUserModel extends DocumentModel implements FriendRequestUserInterface {
    @Expose()
    @prop({ required: true, ref: () => UserModel })
    senderUser!: Ref<UserModel>

    @Expose()
    @prop({ required: true, ref: () => UserModel })
    receiverUser!: Ref<UserModel>

    @Expose()
    @prop({ required: true, default: new Date() })
    releaseDate!: Date

    @Expose()
    @prop({ required: true })
    acceptationType!: AcceptationTypeFriendRequestUserEnum
}

export const FriendRequestUserModelDocument = getModelForClass(FriendRequestUserModel)