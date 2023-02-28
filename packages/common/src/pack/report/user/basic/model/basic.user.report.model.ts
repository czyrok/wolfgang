import { Exclude, Expose } from 'class-transformer'
import { prop, getModelForClass } from '@typegoose/typegoose'

import { UserReportModel } from '../../model/user.report.model'
import { TypeUserReportEnum } from '../../type/enum/type.user.report.enum'
import { BasicUserReportInterface } from '../interface/basic.user.report.interface'
import { TypeReportEnum } from '../../../type/enum/type.report.enum'

@Exclude()
export class BasicUserReportModel extends UserReportModel implements BasicUserReportInterface {
    @Expose()
    @prop({ required: true })
    reportType!: TypeUserReportEnum

    public constructor(reportType: TypeUserReportEnum,
        type: TypeReportEnum,
        gameId: string
    ) {
        super(type, gameId)
        this.reportType = reportType
    }
}

export const BasicUserReportModelDocument = getModelForClass(BasicUserReportModel, { schemaOptions: { collection: 'basic_user_report' } })