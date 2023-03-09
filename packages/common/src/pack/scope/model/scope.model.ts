import { DocumentType, Ref, prop, getModelForClass } from '@typegoose/typegoose'
import { Exclude, Expose } from 'class-transformer'

import { DocumentModel } from '../../model/document.model'

@Exclude()
export class ScopeModel extends DocumentModel {
    @Expose()
    @prop({ ref: () => ScopeModel, default: null })
    parent!: Ref<ScopeModel> | null

    @Expose()
    @prop({ required: true })
    name!: string

    public constructor(
        name: string,
        parent?: DocumentType<ScopeModel>
    ) {
        super()

        this.name = name
        
        if (parent) this.parent = parent
    }
}

export const ScopeModelDocument = getModelForClass(ScopeModel, { schemaOptions: { collection: 'scope' } })