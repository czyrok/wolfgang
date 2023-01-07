import { Exclude, Expose } from 'class-transformer'
import { prop, getModelForClass } from '@typegoose/typegoose'

import { UserReportModel } from '../../model/user.report.model'
import { OtherUserReportInterface } from '../interface/other.user.report.interface'

@Exclude()
export class OtherUserReportModel extends UserReportModel implements OtherUserReportInterface {
    @Expose()
    @prop({ required: true })
    reason!: string
}

export const OtherUserReportModelDocument = getModelForClass(OtherUserReportModel, { schemaOptions: { collection: 'other_user_report' } })