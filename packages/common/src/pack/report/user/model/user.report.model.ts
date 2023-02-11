import { Exclude, Expose } from 'class-transformer'
import { prop, getModelForClass, Ref } from '@typegoose/typegoose'

import { ReportModel } from '../../model/report.model'
import { UserModel } from '../../../user/model/user.model'

import { UserReportInterface } from '../interface/user.report.interface'

import { TypeReportEnum } from '../../type/enum/type.report.enum'

@Exclude()
export class UserReportModel extends ReportModel implements UserReportInterface {
    @Expose()
    @prop({ required: true, default: 0 })
    thumbsUpCount!: number

    @Expose()
    @prop({ required: true, default: 0 })
    thumbsDownCount!: number

    @Expose()
    @prop({ ref: () => UserModel, default: new Array })
    concernedUsers!: Array<Ref<UserModel>>

    public constructor(
        type: TypeReportEnum
    ) {
        super(type)
    }
}

export const UserReportModelDocument = getModelForClass(UserReportModel, { schemaOptions: { collection: 'user_report' } })