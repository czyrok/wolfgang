import { UserReportInterface } from '../../interface/user.report.interface'

export interface OtherUserReportInterface extends UserReportInterface {
    reason: string
}