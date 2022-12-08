import { prop, getModelForClass } from '@typegoose/typegoose'
import { Exclude, Expose } from 'class-transformer'

import { CollectionName } from '../../../../decorator/collection-name.decorator'

import { ReportUserModel } from '../../model/report.user.model'
import { BugReportUserInterface } from '../interface/bug.report.user.interface'

@Exclude()
@CollectionName()
export class BugReportUserModel extends ReportUserModel implements BugReportUserInterface {
    @Expose()
    @prop({ required: true })
    desc!: string
}

export const BugReportUserModelDocument = getModelForClass(BugReportUserModel)