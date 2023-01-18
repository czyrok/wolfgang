import { Exclude, Expose } from 'class-transformer'
import { prop, getModelForClass, Ref } from '@typegoose/typegoose'

import { ReportModel } from '../../model/report.model'
import { UserReportInterface } from '../interface/user.report.interface'
import { UserMessageChatGameModel } from '../../../game/chat/message/user/model/user.message.chat.game.model'

@Exclude()
export class UserReportModel extends ReportModel implements UserReportInterface {
    @Expose()
    @prop({ required: true, ref: () => UserMessageChatGameModel })
    messages!: Array<Ref<UserMessageChatGameModel>>

    @Expose()
    @prop({ required: true })
    thumbsUpCount!: number

    @Expose()
    @prop({ required: true })
    thumbsDownCount!: number
}

export const UserReportModelDocument = getModelForClass(UserReportModel, { schemaOptions: { collection: 'user_report' } })