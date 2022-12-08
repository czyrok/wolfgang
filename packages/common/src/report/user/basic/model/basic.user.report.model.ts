import { prop, getModelForClass } from '@typegoose/typegoose'
import { Exclude, Expose } from 'class-transformer'

import { CollectionName } from '../../../../decorator/collection-name.decorator'
import { UserReportModel } from '../../model/user.report.model'
import { TypeUserReportEnum } from '../../type/enum/type.user.report.enum'
import { BasicUserReportInterface } from '../interface/basic.user.report.interface'

@Exclude()
@CollectionName()
export class BasicUserReportModel extends UserReportModel implements BasicUserReportInterface {
    @Expose()
    @prop({ required: true })
    type!: TypeUserReportEnum
}

export const BasicUserReportModelDocument = getModelForClass(BasicUserReportModel)