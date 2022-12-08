export class PlayerGameModel {
    private _activityDate!: Date
    private _inactivityLevel!: number
    private _isMayor: boolean = false
    private _gamePointAccumulated!: number

    public constructor(activityDate: Date, inactivityLevel: number, isMayor: boolean, gamePointAccumulated: number) {
        this._activityDate = activityDate
        this._inactivityLevel = inactivityLevel
        this._isMayor = isMayor
        this._gamePointAccumulated = gamePointAccumulated
    }

    public set activityDate(value: Date) {
        this._activityDate = value
    }

    public set inactivityLevel(value: number) {
        this._inactivityLevel = value
    }

    public set isMayor(value: boolean) {
        this._isMayor = value
    }

    public set gamePointAccumulated(value: number) {
        this._gamePointAccumulated = value
    }

    public get activityDate(): Date {
        return this._activityDate
    }

    public get inactivityLevel(): number {
        return this._inactivityLevel
    }

    public get isMayor(): boolean {
        return this._isMayor
    }

    public get gamePointAccumulated(): number {
        return this._gamePointAccumulated
    }
}