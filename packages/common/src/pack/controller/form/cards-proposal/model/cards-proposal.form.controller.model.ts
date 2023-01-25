import { Exclude, Expose } from 'class-transformer'

@Exclude()
export class CardsProposalFormControllerModel {
    @Expose()
    private _title: string

    @Expose()
    private _desc: string

    public constructor(
        title: string,
        desc: string
    ) {
        this._title = title
        this._desc = desc
    }

    public get title(): string {
        return this._title
    }

    public get desc(): string {
        return this._desc
    }
}