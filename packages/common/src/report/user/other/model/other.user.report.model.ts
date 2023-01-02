import { Exclude, Expose } from 'class-transformer'

import { Prop, getModelForClass } from '../../../../fix/typegoose.fix'

import { UserReportModel } from '../../model/user.report.model'
import { OtherUserReportInterface } from '../interface/other.user.report.interface'

@Exclude()
export class OtherUserReportModel extends UserReportModel implements OtherUserReportInterface {
    @Expose()
    @Prop({ required: true })
    reason!: string
}

export const OtherUserReportModelDocument = getModelForClass(OtherUserReportModel, { schemaOptions: { collection: 'other_user_report' } })