import { Ref, prop, getModelForClass } from '@typegoose/typegoose'
import { Exclude, Expose } from 'class-transformer'

import { DocumentModel } from '../../model/document.model'
import { UserModel } from '../../user/model/user.model'

import { ReportInterface } from '../interface/report.interface'

@Exclude()
export class ReportModel extends DocumentModel implements ReportInterface {
    @Expose()
    @prop({ required: true, ref: () => UserModel })
    user!: Ref<UserModel>

    @Expose()
    @prop({ required: true, default: Date.now() })
    releaseDate!: Date
}

export const ReportModelDocument = getModelForClass(ReportModel, { schemaOptions: { collection: 'report' } })

