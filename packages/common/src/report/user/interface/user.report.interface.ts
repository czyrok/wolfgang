import { ReportInterface } from '../../interface/report.interface'

export interface UserReportInterface extends ReportInterface {
    thumbsUpCount: number
    thumbsDownCount: number
}