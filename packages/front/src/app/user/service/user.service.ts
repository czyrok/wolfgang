import { Injectable } from '@angular/core'

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private _username!: string

    public set username(value: string) {
        this._username = value
    }

    public get username(): string {
        return this._username
    }
}