import { Expose, Transform } from 'class-transformer'

export class DocumentModel {
    @Expose()
    @Transform((value) => {
        if ('value' in value) return value.obj[value.key].toString()

        return '???'
    })
    public _id!: string

    @Expose()
    public __v!: number
}