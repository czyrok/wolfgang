import { Exclude, Expose } from 'class-transformer'
import { prop, getModelForClass } from '@typegoose/typegoose'

import { ReportModel } from '../../model/report.model'
import { UserReportInterface } from '../interface/user.report.interface'

@Exclude()
export class UserReportModel extends ReportModel implements UserReportInterface {
    @Expose()
    @prop({ required: true })
    thumbsUpCount!: number

    @Expose()
    @prop({ required: true })
    thumbsDownCount!: number
}

export const UserReportModelDocument = getModelForClass(UserReportModel, { schemaOptions: { collection: 'user_report' } })