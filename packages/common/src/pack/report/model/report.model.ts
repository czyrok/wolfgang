import { Ref, prop, getModelForClass } from '@typegoose/typegoose'
import { Exclude, Expose } from 'class-transformer'

import { DocumentModel } from '../../model/document.model'
import { UserModel } from '../../user/model/user.model'

import { ReportInterface } from '../interface/report.interface'

import { TypeReportEnum } from '../type/enum/type.report.enum'

@Exclude()
export class ReportModel extends DocumentModel implements ReportInterface {
    @Expose()
    @prop({ required: true, ref: () => UserModel })
    user!: Ref<UserModel>

    @Expose()
    @prop({ required: true })
    releaseDate!: Date

    @Expose()
    @prop({ required: true })
    type!: TypeReportEnum

    public constructor(type: TypeReportEnum) {
        super()
        this.releaseDate = new Date()
        this.type = type
    }
}

export const ReportModelDocument = getModelForClass(ReportModel, { schemaOptions: { collection: 'report' } })