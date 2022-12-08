import { prop, getModelForClass } from '@typegoose/typegoose'
import { Exclude, Expose } from 'class-transformer'

import { CollectionName } from '../../../decorator/collection-name.decorator'

import { ReportModel } from '../../model/report.model'
import { UserReportInterface } from '../interface/user.report.interface'

@Exclude()
@CollectionName()
export class UserReportModel extends ReportModel implements UserReportInterface {
    @Expose()
    @prop({ required: true })
    thumbsUpCount!: number

    @Expose()
    @prop({ required: true })
    thumbsDownCount!: number
}

export const UserReportModelDocument = getModelForClass(UserReportModel)