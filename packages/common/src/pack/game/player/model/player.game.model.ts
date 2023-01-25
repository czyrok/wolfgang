import { Exclude, Expose, instanceToPlain } from 'class-transformer'
import { Socket } from 'socket.io'
import { TypeLogEnum } from '../../../log/type/enum/type.log.enum'
import { LogUtil } from '../../../log/util/log.util'
import { TypeGroupTransformEnum } from '../../../transform/group/type/enum/type.group.transform.enum'

import { UserModel } from '../../../user/model/user.model'
import { CardGameModel } from '../../card/model/card.game.model'
import { TypeBehaviorItemLoopGameEnum } from '../../loop/item/behavior/type/enum/type.behavior.item.loop.game.enum'

import { CampPlayerGameEnum } from '../camp/enum/camp.player.game.enum'

@Exclude()
export class PlayerGameModel {
    @Expose()
    private _user: UserModel

    private _socketsList: Array<Socket> = new Array

    @Expose({ groups: [TypeGroupTransformEnum.SELF] })
    private _activityDate!: Date

    @Expose({ groups: [TypeGroupTransformEnum.SELF] })
    private _inactivityLevel: number = 0

    @Expose()
    private _isMayor: boolean = false

    @Expose({ groups: [TypeGroupTransformEnum.SELF] })
    private _gamePointAccumulated: number = 0

    @Expose()
    private _isDead: boolean = false

    @Expose({ groups: [TypeGroupTransformEnum.SELF] })
    private _camp: CampPlayerGameEnum = CampPlayerGameEnum.UNDEFINED

    @Expose({ groups: [TypeGroupTransformEnum.SELF] })
    private _card!: CardGameModel

    @Expose()
    private _behaviorList: Array<TypeBehaviorItemLoopGameEnum> = new Array

    public constructor(user: UserModel) {
        this._user = user
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

    public set isDead(value: boolean) {
        this._isDead = value
    }

    public set camp(value: CampPlayerGameEnum) {
        this._camp = value
    }

    public set card(value: CardGameModel) {
        this._card = value
    }

    @Expose()
    public get user(): UserModel {
        return this._user
    }

    public get socketsList(): Array<Socket> {
        return this._socketsList
    }

    @Expose({ groups: [TypeGroupTransformEnum.SELF] })
    public get activityDate(): Date {
        return this._activityDate
    }

    @Expose({ groups: [TypeGroupTransformEnum.SELF] })
    public get inactivityLevel(): number {
        return this._inactivityLevel
    }

    @Expose()
    public get isMayor(): boolean {
        return this._isMayor
    }

    @Expose({ groups: [TypeGroupTransformEnum.SELF] })
    public get gamePointAccumulated(): number {
        return this._gamePointAccumulated
    }

    @Expose()
    public get isDead(): boolean {
        return this._isDead
    }

    @Expose({ groups: [TypeGroupTransformEnum.SELF] })
    public get camp(): CampPlayerGameEnum {
        return this._camp
    }

    @Expose({ groups: [TypeGroupTransformEnum.SELF] })
    public get card(): CardGameModel {
        return this._card
    }

    private get behaviorList(): Array<TypeBehaviorItemLoopGameEnum> {
        return this._behaviorList
    }

    public updateActivityDate(): void {
        this.activityDate = new Date
    }

    public hasBehavior(behavior: TypeBehaviorItemLoopGameEnum): boolean {
        const index: number = this.behaviorList.indexOf(behavior)

        return index > 0 ? true : false
    }

    public addBehavior(behavior: TypeBehaviorItemLoopGameEnum): void {
        const index: number = this.behaviorList.indexOf(behavior)

        if (index < 0) this.behaviorList.push(behavior)
    }

    public notifyUpdate(): void {
        let obj: any = undefined

        try {
            obj = instanceToPlain(this, { groups: [TypeGroupTransformEnum.SELF] })

            LogUtil.logger(TypeLogEnum.GAME).warn('cet objettttt', obj)
        } catch (error: any) {
            LogUtil.logger(TypeLogEnum.GAME).error('cet objettttt11', error)
        }

        if (!obj) return

        for (const socket of this.socketsList) {
            socket.emit('playerState', obj)
        }
    }
}