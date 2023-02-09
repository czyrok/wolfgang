import { Exclude, Expose } from 'class-transformer'
import { prop, getModelForClass } from '@typegoose/typegoose'

import { UserReportModel } from '../../model/user.report.model'
import { OtherUserReportInterface } from '../interface/other.user.report.interface'
import { TypeReportEnum } from '../../../type/enum/type.report.enum'

@Exclude()
export class OtherUserReportModel extends UserReportModel implements OtherUserReportInterface {
    @Expose()
    @prop({ required: true })
    reason!: string

    public constructor(reason: string,
        type: TypeReportEnum
    ) {
        super(type)
        this.reason = reason
    }
}

export const OtherUserReportModelDocument = getModelForClass(OtherUserReportModel, { schemaOptions: { collection: 'other_user_report' } })