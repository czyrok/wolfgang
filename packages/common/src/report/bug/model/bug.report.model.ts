import { prop, getModelForClass } from '@typegoose/typegoose'
import { Exclude, Expose } from 'class-transformer'

import { CollectionName } from '../../../decorator/collection-name.decorator'

import { ReportModel } from '../../model/report.model'
import { BugReportInterface } from '../interface/bug.report.interface'

@Exclude()
@CollectionName()
export class BugReportModel extends ReportModel implements BugReportInterface {
    @Expose()
    @prop({ required: true })
    desc!: string
}

export const BugReportModelDocument = getModelForClass(BugReportModel)