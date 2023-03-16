import { DocumentType } from "@typegoose/typegoose"

import { UserModel } from "../model/user.model"
import { BasicUserReportModelDocument } from "../../report/user/basic/model/basic.user.report.model"
import { OtherUserReportModelDocument } from "../../report/user/other/model/other.user.report.model"

export class UserHelper {
    public static async canJoinOrCreateGame(user: DocumentType<UserModel>): Promise<boolean> {
        let userPunishedReportCount = (await OtherUserReportModelDocument.aggregate([
            {
                $match: {
                    punished: true,
                    concernedUsers: [user._id]
                }
            },
            { $count: 'count' }
        ]).exec())[0]?.count ?? 0

        userPunishedReportCount += (await BasicUserReportModelDocument.aggregate([
            {
                $match: {
                    punished: true,
                    concernedUsers: [user._id]
                }
            },
            { $count: 'count' }
        ]).exec())[0]?.count ?? 0

        if (userPunishedReportCount >= 5) return false

        return true
    }
}