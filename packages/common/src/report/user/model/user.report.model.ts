import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose'
import { Exclude, Expose } from 'class-transformer'

import { ReportModel } from '../../model/report.model'
import { UserReportInterface } from '../interface/user.report.interface'

@Exclude()
@modelOptions({ schemaOptions: { collection: "user_report" } })
export class UserReportModel extends ReportModel implements UserReportInterface {
    @Expose()
    @prop({ required: true })
    thumbsUpCount!: number

    @Expose()
    @prop({ required: true })
    thumbsDownCount!: number
}

export const UserReportModelDocument = getModelForClass(UserReportModel)