import { Exclude, Expose } from 'class-transformer'

@Exclude()
export class LogInFormControllerModel {
    @Expose()
    private _username: string

    @Expose()
    private _password: string

    public constructor(
        username: string,
        password: string
    ) {
        this._username = username
        this._password = password
    }

    public get username(): string {
        return this._username
    }

    public get password(): string {
        return this._password
    }
}