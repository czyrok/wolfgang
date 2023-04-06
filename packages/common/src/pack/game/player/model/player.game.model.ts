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

/**
 * Classe qui créer un joueur
 */
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

    /**
     * Constructeur
     * @param user Utilisateur
     */
    public constructor(user: UserModel) {
        this._user = user
    }

    /**
     * Met à jour la date d'activité
     * @param value Date
     */
    public set activityDate(value: Date) {
        this._activityDate = value
    }

    /**
     * Met à jour le niveau d'inactivité
     * @param value Niveau d'inactivité
     */
    public set inactivityLevel(value: number) {
        this._inactivityLevel = value
    }

    /**
     * 
     */
    public set isMayor(value: boolean) {
        this._isMayor = value
    }

    /**
     * Met à jour le nombre de points accumulé
     * @param value Nombre de points accumulés
     */
    public set gamePointAccumulated(value: number) {
        this._gamePointAccumulated = value
    }

    /**
     * Met à jour si le joueur est mort ou non
     * @param value True s'il est mort, false sinon
     */
    public set isDead(value: boolean) {
        this._isDead = value
    }

    /**
     * Met à jour le camp du joueur
     * @param value camp 
     */
    public set camp(value: CampPlayerGameEnum) {
        this._camp = value
    }

    /**
     * Met à jour la carte du joueur
     * @param value Carte
     */
    public set card(value: CardGameModel) {
        this._card = value
    }

    /**
     * Renvoie l'utilisateur
     * @returns Renvoie l'utilisateur
     */
    @Expose()
    public get user(): UserModel {
        return this._user
    }

    /**
     * Renvoie la liste des sockets
     * @returns Renvoie la liste des sockets
     */
    public get socketsList(): Array<Socket> {
        return this._socketsList
    }

    /**
     * Renvoie la date d'activité
     * @returns Renvoie la date d'activité
     */
    @Expose({ groups: [TypeGroupTransformEnum.SELF] })
    public get activityDate(): Date {
        return this._activityDate
    }

    /**
     * Renvoie le niveau d'inactivité
     * @returns Renvoie le niveau d'inactivité
     */
    @Expose({ groups: [TypeGroupTransformEnum.SELF] })
    public get inactivityLevel(): number {
        return this._inactivityLevel
    }

    /**
     * 
     */
    @Expose()
    public get isMayor(): boolean {
        return this._isMayor
    }

    /**
     * Renvoie les points accumulés
     * @returns Renvoie les points accumulés
     */
    @Expose({ groups: [TypeGroupTransformEnum.SELF] })
    public get gamePointAccumulated(): number {
        return this._gamePointAccumulated
    }

    /**
     * Renvoie true si le joueur est mort, false sinon
     * @returns Renvoie true si le joueur est mort, false sinon
     */
    @Expose()
    public get isDead(): boolean {
        return this._isDead
    }

    /**
     * Renvoie le camp
     * @returns Renvoie le camp
     */
    @Expose({ groups: [TypeGroupTransformEnum.SELF] })
    public get camp(): CampPlayerGameEnum {
        return this._camp
    }

    /**
     * Renvoie la carte
     * @returns Renvoie la carte
     */
    @Expose({ groups: [TypeGroupTransformEnum.SELF] })
    public get card(): CardGameModel {
        return this._card
    }

    /**
     * Fonction qui renvoie
     * @param state Statue de la partie
     * @param priorityChatType Type de la priorité du chat
     * @returns Renvoie 
     */
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

    /**
     * Fonction qui renvoie le chat
     * @returns Renvoie le chat
     */
    public getAllChat(): Array<TypeChatGameEnum> {
        const chatTypeList: Array<TypeChatGameEnum> = new Array

        const behaviorList: Array<BehaviorItemLoopGameModel> = BehaviorItemLoopGameModel.getBehaviorOfPlayer(this)

        for (const behavior of behaviorList) {
            if (behavior.config.chat) chatTypeList.push(behavior.config.chat)
        }

        return chatTypeList
    }

    /**
     * Fonction qui met à jour la date d'activité
     */
    public updateActivityDate(): void {
        this.activityDate = new Date
    }

    /**
     * 
     * @param currentBehaviorTypes 
     * @returns 
     */
    public hisTurn(currentBehaviorTypes: Array<TypeBehaviorItemLoopGameEnum>): TypeBehaviorItemLoopGameEnum | undefined {
        for (const behaviorType of currentBehaviorTypes) {
            for (const behavior of BehaviorItemLoopGameModel.getBehaviorOfPlayer(this)) {
                if (behavior.config.type === behaviorType) return behaviorType
            }
        }

        return undefined
    }

    /**
     * Fonction qui donne les points accumulés aux joueurs qui sont encore en vie
     */
    public async end(): Promise<void> {
        const user: DocumentType<UserModel> | null = await UserModelDocument.findById(this.user._id).exec()

        if (!user) throw new NotFoundUserError

        user.gamePointCount += this.gamePointAccumulated

        if (this.gamePointAccumulated > 0) this.emit<undefined>('winGamePoints', undefined)

        this.gamePointAccumulated = 0

        await user.save()
        //await user.updateOne({ gamePointCount: user.gamePointCount }).exec()
    }

    /**
     * Fonction qui augmante le nombre de victoire aux joueurs qui ont gagné
     */
    public async winngEnd(): Promise<void> {
        const user: DocumentType<UserModel> | null = await UserModelDocument.findById(this.user._id).exec()

        if (!user) throw new NotFoundUserError

        user.winnedGameCount += 1

        if (user.winnedGameCount % 5 == 0) {
            user.level += 1
            
            this.emit<undefined>('winLevel', undefined)
        }

        await user.save()
        //await user.updateOne({ gamePointCount: user.gamePointCount }).exec()
    }

    /**
     * 
     * @returns 
     */
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

    /**
     * 
     * @param event 
     * @param object 
     * @returns 
     */
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