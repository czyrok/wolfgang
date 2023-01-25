import { Expose, Transform } from 'class-transformer'

export class DocumentModel {
    @Expose({ name: 'id' })
    @Transform((value) => {
        if ('value' in value) return value.obj[value.key].toString()

        return '???'
    })
    public _id!: string

    @Expose()
    public __v!: number


    public get id(): string {
        return this._id
    }

    public get v(): number {
        return this.__v
    }

    public getId(): string {
        return this._id
    }
}