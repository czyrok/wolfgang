import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose'
import { Exclude, Expose } from 'class-transformer'

import { UserReportModel } from '../../model/user.report.model'
import { TypeUserReportEnum } from '../../type/enum/type.user.report.enum'
import { BasicUserReportInterface } from '../interface/basic.user.report.interface'

@Exclude()
@modelOptions({ schemaOptions: { collection: "basic_user_report" } })
export class BasicUserReportModel extends UserReportModel implements BasicUserReportInterface {
    @Expose()
    @prop({ required: true })
    type!: TypeUserReportEnum
}

export const BasicUserReportModelDocument = getModelForClass(BasicUserReportModel)