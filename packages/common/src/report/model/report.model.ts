import { prop, getModelForClass, Ref } from '@typegoose/typegoose'
import { Exclude, Expose } from 'class-transformer'

import { CollectionName } from '../../decorator/collection-name.decorator'

import { DocumentModel } from '../../model/document.model'
import { UserModel } from '../../user/model/user.model'

import { ReportInterface } from '../interface/report.interface'

@Exclude()
@CollectionName()
export class ReportModel extends DocumentModel implements ReportInterface {
    @Expose()
    @prop({ required: true, ref: () => UserModel })
    user!: Ref<UserModel>
}

export const ReportModelDocument = getModelForClass(ReportModel)

