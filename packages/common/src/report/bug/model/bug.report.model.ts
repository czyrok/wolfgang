import { Exclude, Expose } from 'class-transformer'

import { Prop, getModelForClass } from '../../../fix/typegoose.fix'

import { ReportModel } from '../../model/report.model'
import { BugReportInterface } from '../interface/bug.report.interface'

@Exclude()
export class BugReportModel extends ReportModel implements BugReportInterface {
    @Expose()
    @Prop({ required: true })
    desc!: string
}

export const BugReportModelDocument = getModelForClass(BugReportModel, { schemaOptions: { collection: 'bug_report' } })