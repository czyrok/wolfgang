import { Exclude, Expose } from 'class-transformer'
import { prop, getModelForClass } from '@typegoose/typegoose'

import { UserReportModel } from '../../model/user.report.model'
import { TypeUserReportEnum } from '../../type/enum/type.user.report.enum'
import { BasicUserReportInterface } from '../interface/basic.user.report.interface'

@Exclude()
export class BasicUserReportModel extends UserReportModel implements BasicUserReportInterface {
    @Expose()
    @prop({ required: true })
    type!: TypeUserReportEnum
}

export const BasicUserReportModelDocument = getModelForClass(BasicUserReportModel, { schemaOptions: { collection: 'basic_user_report' } })