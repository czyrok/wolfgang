import { UserReportInterface } from '../../interface/user.report.interface'
import { TypeUserReportEnum } from '../../type/enum/type.user.report.enum'

export interface BasicUserReportInterface extends UserReportInterface {
    reportType: TypeUserReportEnum
}