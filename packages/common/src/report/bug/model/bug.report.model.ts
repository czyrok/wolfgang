import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose'
import { Exclude, Expose } from 'class-transformer'

import { ReportModel } from '../../model/report.model'
import { BugReportInterface } from '../interface/bug.report.interface'

@Exclude()
@modelOptions({ schemaOptions: { collection: "bug_report" } })
export class BugReportModel extends ReportModel implements BugReportInterface {
    @Expose()
    @prop({ required: true })
    desc!: string
}

export const BugReportModelDocument = getModelForClass(BugReportModel)