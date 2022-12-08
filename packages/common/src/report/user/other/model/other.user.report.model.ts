import { prop, getModelForClass } from '@typegoose/typegoose'
import { Exclude, Expose } from 'class-transformer'

import { CollectionName } from '../../../../decorator/collection-name.decorator'
import { UserReportModel } from '../../model/user.report.model'
import { OtherUserReportInterface } from '../interface/other.user.report.interface'

@Exclude()
@CollectionName()
export class OtherUserReportModel extends UserReportModel implements OtherUserReportInterface {
    @Expose()
    @prop({ required: true })
    reason!: string
}

export const OtherUserReportModelDocument = getModelForClass(OtherUserReportModel)