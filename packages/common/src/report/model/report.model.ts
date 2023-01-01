import { Ref } from '@typegoose/typegoose'
import { Exclude, Expose } from 'class-transformer'

import { Prop, getModelForClass } from '../../fix/typegoose.fix'

import { DocumentModel } from '../../model/document.model'
import { UserModel } from '../../user/model/user.model'

import { ReportInterface } from '../interface/report.interface'

@Exclude()
export class ReportModel extends DocumentModel implements ReportInterface {
    @Expose()
    @Prop({ required: true, ref: () => UserModel })
    user!: Ref<UserModel>

    @Expose()
    @Prop({ required: true })
    releaseDate!: Date
}

export const ReportModelDocument = getModelForClass(ReportModel, { schemaOptions: { collection: 'report' } })

