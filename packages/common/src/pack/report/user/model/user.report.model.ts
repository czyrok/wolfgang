import { Exclude, Expose } from 'class-transformer'
import { prop, getModelForClass, Ref } from '@typegoose/typegoose'

import { ReportModel } from '../../model/report.model'
import { UserReportInterface } from '../interface/user.report.interface'
import { UserModel } from '../../../user/model/user.model'

@Exclude()
export class UserReportModel extends ReportModel implements UserReportInterface {
    @Expose()
    @prop({ required: true })
    thumbsUpCount!: number

    @Expose()
    @prop({ required: true })
    thumbsDownCount!: number

    @Expose()
    @prop({ ref: () => UserModel, default: new Array })
    concernedUsers!: Array<Ref<UserModel>>
}

export const UserReportModelDocument = getModelForClass(UserReportModel, { schemaOptions: { collection: 'user_report' } })