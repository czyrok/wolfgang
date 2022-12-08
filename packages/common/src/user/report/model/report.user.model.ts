import { prop, getModelForClass, Ref } from '@typegoose/typegoose'
import { Exclude, Expose } from 'class-transformer'

import { CollectionName } from '../../../decorator/collection-name.decorator'

import { DocumentModel } from '../../../model/document.model'
import { UserModel } from '../../model/user.model'

import { ReportUserInterface } from '../interface/report.user.interface'

@Exclude()
@CollectionName()
export class ReportUserModel extends DocumentModel implements ReportUserInterface {
    @Expose()
    @prop({ required: true, ref: () => UserModel })
    user!: Ref<UserModel>

    @Expose()
    @prop({ required: true })
    id!: string
}

export const ReportUserModelDocument = getModelForClass(ReportUserModel)

