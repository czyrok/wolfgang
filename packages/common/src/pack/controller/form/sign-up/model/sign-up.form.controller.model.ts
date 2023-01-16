import { Exclude, Expose } from 'class-transformer'

@Exclude()
export class SignUpFormControllerModel {
    @Expose()
    private _username!: string

    @Expose()
    private _email!: string

    @Expose()
    private _password!: string

    public constructor(
        username: string,
        email: string,
        password: string
    ) {
        this._username = username
        this._email = email
        this._password = password
    }

    public get username(): string {
        return this._username
    }

    public get email(): string {
        return this._email
    }

    public get password(): string {
        return this._password
    }
}