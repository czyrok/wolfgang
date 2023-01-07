import { Expose, Transform } from 'class-transformer'

export class DocumentModel {
    @Expose()
    @Transform((value) => {
        if ('value' in value) return value.obj[value.key].toString()

        return '???'
    })
    protected _id!: string

    @Expose()
    protected __v!: number

    public get id(): string {
        return this._id
    }

    public get v(): number {
        return this.__v
    }
}