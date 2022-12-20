import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose'
import { Exclude, Expose } from 'class-transformer'

import { UserReportModel } from '../../model/user.report.model'
import { OtherUserReportInterface } from '../interface/other.user.report.interface'

@Exclude()
@modelOptions({ schemaOptions: { collection: "other_user_report" } })
export class OtherUserReportModel extends UserReportModel implements OtherUserReportInterface {
    @Expose()
    @prop({ required: true })
    reason!: string
}

export const OtherUserReportModelDocument = getModelForClass(OtherUserReportModel)