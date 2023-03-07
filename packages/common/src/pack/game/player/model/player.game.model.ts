import { Exclude, Expose, instanceToPlain } from 'class-transformer'
import { Socket } from 'socket.io'
import { DocumentType } from '@typegoose/typegoose'

import { NotFoundUserError } from '../../../user/error/not-found.user.error'

import { BehaviorItemLoopGameModel } from '../../loop/item/behavior/model/behavior.item.loop.game.model'
import { StateGameModel } from '../../state/model/state.game.model'
import { UserModel, UserModelDocument } from '../../../user/model/user.model'
import { CardGameModel } from '../../card/model/card.game.model'

import { TypeGroupTransformEnum } from '../../../transform/group/type/enum/type.group.transform.enum'
import { TypeChatGameEnum } from '../../chat/type/enum/type.chat.game.enum'
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

    public getAvailableChatType(state: StateGameModel, priorityChatType?: TypeChatGameEnum): TypeChatGameEnum | null | boolean {
        const behaviorList: Array<BehaviorItemLoopGameModel> = BehaviorItemLoopGameModel.getBehaviorOfPlayer(this)

        if (priorityChatType) {
            for (const behavior of behaviorList) {
                if (!behavior.config.chat) continue
                if (behavior.config.chat !== priorityChatType) continue

                if (behavior.checkChatAvailable(state)) return priorityChatType
            }

            return false
        }

        return BehaviorItemLoopGameModel.getFirstChatTypeAvailable(state, behaviorList)
    }

    public getAllChat(): Array<TypeChatGameEnum> {
        const chatTypeList: Array<TypeChatGameEnum> = new Array

        const behaviorList: Array<BehaviorItemLoopGameModel> = BehaviorItemLoopGameModel.getBehaviorOfPlayer(this)

        for (const behavior of behaviorList) {
            if (behavior.config.chat) chatTypeList.push(behavior.config.chat)
        }

        return chatTypeList
    }

    public updateActivityDate(): void {
        this.activityDate = new Date
    }

    public hisTurn(currentBehaviorTypes: Array<TypeBehaviorItemLoopGameEnum>): TypeBehaviorItemLoopGameEnum | undefined {
        for (const behaviorType of currentBehaviorTypes) {
            for (const behavior of BehaviorItemLoopGameModel.getBehaviorOfPlayer(this)) {
                if (behavior.config.type === behaviorType) return behaviorType
            }
        }

        return undefined
    }

    public async end(): Promise<void> {
        const user: DocumentType<UserModel> | null = await UserModelDocument.findById(this.user._id).exec()

        if (!user) throw new NotFoundUserError

        user.gamePointCount += this.gamePointAccumulated

        this.gamePointAccumulated = 0

        await user.updateOne({ gamePointCount: user.gamePointCount }).exec()
    }

    public notifyUpdate(): void {
        let plainObject: any = undefined

        try {
            plainObject = instanceToPlain(this, { groups: [TypeGroupTransformEnum.SELF] })
        } catch (_error: any) { }

        if (!plainObject) return

        for (const socket of this.socketsList) {
            socket.emit('playerState', plainObject)
        }
    }

    public emit<T>(event: string, object: T): void {
        if (object) {
            let plainObject: any = undefined

            try {
                plainObject = instanceToPlain(object)
            } catch (_error: any) { }

            if (!plainObject) return
        }

        for (const socket of this.socketsList) {
            socket.emit(event)
        }
    }
}