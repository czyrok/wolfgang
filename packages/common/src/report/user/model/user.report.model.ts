import { Exclude, Expose } from 'class-transformer'

import { Prop, getModelForClass } from '../../../fix/typegoose.fix'

import { ReportModel } from '../../model/report.model'
import { UserReportInterface } from '../interface/user.report.interface'

@Exclude()
export class UserReportModel extends ReportModel implements UserReportInterface {
    @Expose()
    @Prop({ required: true })
    thumbsUpCount!: number

    @Expose()
    @Prop({ required: true })
    thumbsDownCount!: number
}

export const UserReportModelDocument = getModelForClass(UserReportModel, { schemaOptions: { collection: 'user_report' } })