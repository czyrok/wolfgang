import { Expose, Transform } from 'class-transformer'

export class DocumentModel {
    @Transform((value) => {
        if ('value' in value && value.obj[value.key]) return value.obj[value.key].toString()

        return '???'
    })
    @Expose()
    public _id!: string
    
    protected __v!: number

    public get id(): string {
        return this._id.toString()
    }

    public get v(): number {
        return this.__v
    }

    public getId(): string {
        return this._id
    }
}