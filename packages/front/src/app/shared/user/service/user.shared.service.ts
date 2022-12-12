import { Injectable } from '@angular/core'

@Injectable()
export class UserSharedService {
    private _pseudo: string = ''

    public set pseudo(value: string) {
        this._pseudo = value
    }

    public get pseudo(): string {
        return this._pseudo
    }
}