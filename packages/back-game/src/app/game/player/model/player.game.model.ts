import { CardPlayerGameModel } from '../card/model/card.player.game.model'

import { CampPlayerGameEnum } from '../camp/enum/camp.player.game.enum'

export class PlayerGameModel {
    private _activityDate!: Date
    private _inactivityLevel: number = 0
    private _isMayor: boolean = false
    private _gamePointAccumulated: number = 0
    private _isDead: boolean = false
    private _camp: CampPlayerGameEnum = CampPlayerGameEnum.UNDEFINED
    private _card!: CardPlayerGameModel

    constructor(private _username: string, private _socketId: string) { }

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

    public set isDead(value: boolean) {
        this._isDead = value
    }

    public set camp(value: CampPlayerGameEnum) {
        this._camp = value
    }

    public set card(value: CardPlayerGameModel) {
        this._card = value
    }

    public get username(): string {
        return this._username
    }

    public get socketId(): string {
        return this._socketId
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

    public get isDead(): boolean {
        return this._isDead
    }

    public get camp(): CampPlayerGameEnum {
        return this._camp
    }

    public get card(): CardPlayerGameModel {
        return this._card
    }

    public updateActivityDate(): void {
        this.activityDate = new Date
    }
}