import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Subject } from 'rxjs'
import { LinkNamespaceSocketModel, BuildManagerSocketInterface, AlternativeBuildManagerSocketInterface, ManagerSocketModel, NamespaceSocketModel, StateGameModel } from 'common'

import { environment } from 'src/environments/environment'

import { SocketSharedService } from '../../socket/service/socket.shared.service'
import { SessionSharedService } from '../../session/service/session.shared.service'
import { DisplayAlertSharedService } from '../../alert/display/service/display.alert.shared.service'

import { DisplayAlertSharedInterface } from '../../alert/display/interface/display.alert.shared.interface'

@Injectable({
    providedIn: 'root'
})
/**
 * @classdesc Service qui gère les parties
 * @implements HandlerLinkSocketInterface
 */
export class GameSharedService implements BuildManagerSocketInterface, AlternativeBuildManagerSocketInterface {
    private _socketManager?: ManagerSocketModel
    private _socketNamespace?: NamespaceSocketModel

    private _inGame: boolean = false
    private _gameId?: string
    private _currentGameId?: string

    private _alreadyInGameAlert?: DisplayAlertSharedInterface

    private _stateChange: Subject<StateGameModel> = new Subject
    private _gameState?: StateGameModel

    private _joinEvent: Subject<void> = new Subject

    /**
     * @param router Permet de rediriger
     * @param displayAlertSharedService Permet d'afficher des alertes
     * @param sessionSharedService La session de l'utilisateur
     * @param socketSharedService Service de socket
     */
    public constructor(
        private router: Router,
        private socketSharedService: SocketSharedService,
        private sessionSharedService: SessionSharedService,
        private displayAlertSharedService: DisplayAlertSharedService
    ) { }

    /**
     * Modifie le gestionnaire de socket
     * @param value La nouvelle valeur
     */
    private set socketManager(value: ManagerSocketModel | undefined) {
        this._socketManager = value
    }

    /**
     * Renvoie le gestionnaire de socket
     * @returns Le gestionnaire
     */
    public get socketManager(): ManagerSocketModel {
        if (!this._socketManager) {
            this._socketManager = new ManagerSocketModel(environment.GAME_URL, environment.GAME_PORT)
            this._socketManager.socketIoManager.reconnection(true)
            this._socketManager.connect()
        }

        return this._socketManager
    }
  
    /**
     * Modifie le modèle du socket du namespace de jeu
     * @param value La nouvelle valeur
     */
    private set socketNamespace(value: NamespaceSocketModel | undefined) {
        this._socketNamespace = value
    }

    /**
     * Renvoie le modèle avec le socket du namespace de jeu
     * @returns Le modèle
     */
    private get socketNamespace(): NamespaceSocketModel {
        if (!this._socketNamespace)
            this._socketNamespace = this.socketManager.buildNamespace('/game/' + this.currentGameId)

        return this._socketNamespace
    }

    /**
     * Permet de savoir le joueur est dans une partie ou non
     * @returns Vrai si le joueur est dans une partie, sinon faux
     */
    public get inGame(): boolean {
        return this._inGame
    }

    /**
     * Modifie l'état d'une partie
     * @param value La nouvelle valeur
     */
    private set inGame(value: boolean) {
        this._inGame = value
    }

    /**
     * Renvoie l'ID de la partie dans laquelle est le joueur
     * @returns L'ID de la partie
     */
    public get gameId(): string | undefined {
        return this._gameId
    }

    /**
     * Modifie l'ID de la partie dans laquelle est le joueur
     * @param valeur La nouvelle valeur
     */
    private set gameId(value: string | undefined) {
        this._gameId = value
    }

    /**
     * Renvoie l'ID de la partie actuelle
     * @returns L'ID
     */
    public get currentGameId(): string | undefined {
        return this._currentGameId
    }

    /**
     * Assigne l'ID de la partie actuelle
     * @param valeur La nouvelle valeur
     */
    private set currentGameId(value: string | undefined) {
        this._currentGameId = value
    }

    /**
     * Renvois l'état de la partie actuelle
     * @returns L'état
     */
    public get gameState(): StateGameModel | undefined {
        return this._gameState
    }
    
    /**
     * Renvoie l'évènement déclenché lors du changement de l'état de la partie actuelle
     * @returns L'évènement
     */
    private get stateChange(): Subject<StateGameModel> {
        return this._stateChange
    }
    
    /**
     * Renvoie l'alerte disant que le joueur est déjà dans une partie
     * @returns L'alerte
     */
    public get alreadyInGameAlert(): DisplayAlertSharedInterface | undefined {
        return this._alreadyInGameAlert
    }

    /**
     * Assigne l'affichage de l'alerte
     * @param Valeur à assigner
     */
    private set alreadyInGameAlert(value: DisplayAlertSharedInterface | undefined) {
        this._alreadyInGameAlert = value
    }

    /**
     * Renvoie l'évènement associé au fait de rejoindre une partie
     * @returns L'évènement
     */
    public get joinEvent(): Subject<void> {
        return this._joinEvent
    }

    /**
     * Renvoie le modèle contenant le socket de l'espace de nom renseigné
     * @param namespaceName Correspond à l'espace de nom
     * @returns Le modèle
     */
    async buildNamespace(namespaceName: string): Promise<NamespaceSocketModel> {
        await this.sessionSharedService.refreshSession()

        return this.socketNamespace.buildNamespace(namespaceName)
    }

    /**
     * Renvoie le modèle contenant le socket de l'espace de nom et de l'évènement renseignés
     * @param namespaceName Correspond à l'espace de nom
     * @param event Correspond à l'évènement
     * @returns Le modèle
     */
    async buildLink<S, R, E = any>(namespaceName: string, event: string): Promise<LinkNamespaceSocketModel<S, R, E>> {
        await this.sessionSharedService.refreshSession()

        return this.socketNamespace.buildLink(namespaceName, event)
    }
    
    /**
     * Renvoie le modèle contenant le socket de l'évènement à la base
     * @param event Correspond à l'évènement
     * @returns Le modèle
     */
    async buildBaseLink<S, R, E = any>(event: string): Promise<LinkNamespaceSocketModel<S, R, E>> {
        await this.sessionSharedService.refreshSession()

        return this.socketNamespace.buildBaseLink(event)
    } 

    /**
     * Vérifie si l'utilisateur est dans une partie ou non
     */
    public async checkStatus(): Promise<void> {
        const checkUserGameLink: LinkNamespaceSocketModel<void, string> = await this.socketSharedService.buildLink('/game', 'checkUserGame')

        return new Promise((resolve: (value: void) => void, reject: (error: any) => void) => {
            checkUserGameLink.on((gameId: string) => {
                checkUserGameLink.destroy()

                if (gameId === '') {
                    this.inGame = false
                    this.gameId = undefined
                } else {
                    this.inGame = true

                    if (this.gameId !== gameId) {
                        this.gameId = gameId

                        this.displayJoinYourGameAlert()
                    }
                }

                resolve()
            })

            checkUserGameLink.onFail((error: any) => {
                checkUserGameLink.destroy()

                reject(error)
            })

            checkUserGameLink.emit()
        })
    }

    /**
     * Permet de rejoindre une partie
     * @param gameId ID de la partie
     * @returns Renvoie vrai si l'utilisateur peut rejoindre la partie sinon faux
     */
    public async joinGame(gameId: string): Promise<boolean> {
        if (this.currentGameId === gameId) return true

        if (this.currentGameId) this.quitParty()

        if (!(await this.checkParty(gameId))) return false

        this.currentGameId = gameId

        this.joinEvent.next()

        return true
    }

    /**
     * Permet de quiter une partie
     */
    public quitParty(): void {
        this.inGame = false
        this.gameId = undefined
        this.currentGameId = undefined

        this.socketNamespace.destroy()
        this.socketManager.close()

        this.socketNamespace = undefined
        this.socketManager = undefined
    }

    /**
     * Permet de rejoindre une partie en tant que joueur
     * @returns Un booléen pour savoir si ou non l'utilisateur a rejoint en tant que joueur
     */
    public async joinGameAsPlayer(): Promise<boolean> {
        if (!this.currentGameId) return false

        const test: boolean = await this.joinGame(this.currentGameId)

        if (!test) return false

        if (this.inGame && this.gameId !== this.currentGameId) return false

        this.closeJoinYourGameAlert()

        const joinLink: LinkNamespaceSocketModel<void, boolean> = await this.buildBaseLink('join')

        return new Promise((resolve: (value: boolean) => void, reject: (error: any) => void) => {
            joinLink.on((test: boolean) => {
                joinLink.destroy()

                if (test) {
                    this.inGame = true
                    this.gameId = this.currentGameId
                }

                resolve(test)
            })

            joinLink.onFail((error: any) => {
                joinLink.destroy()

                this.displayAlertSharedService.emitDanger(error)

                reject(error)
            })

            joinLink.emit()
        })
    }
    
    /**
     * Vérifie si la partie existe
     * @param gameId ID de la partie
     * @returns Un promesse qui renvoie vrai si elle existe et non sinon
     */
    private async checkParty(gameId: string): Promise<boolean> {
        return this.socketSharedService.check<undefined>('/play/' + gameId, 'check', undefined)
    }

    /**
     * Permet l'affichage de l'alerte disant que l'utilisateur est déjà en partie
     */
    public displayJoinYourGameAlert(): void {
        this.alreadyInGameAlert?.componentRef?.instance.click()
        this.alreadyInGameAlert = undefined

        if (this.inGame) {
            this.alreadyInGameAlert = this.displayAlertSharedService.emitInform('Vous êtes déjà dans une partie', undefined, false, [
                {
                    text: 'Rejoindre',
                    callback: () => {
                        this.router.navigateByUrl(`/play/${this.gameId}`)
                    }
                }
            ])
        }
    }

    /**
     * Permet de fermer l'alerte disant que le joueur est déjà en partie
     */
    public closeJoinYourGameAlert(): void {
        this.alreadyInGameAlert?.componentRef?.instance.click()
        this.alreadyInGameAlert = undefined
    }

    /**
     * Permet de mettre à jour l'état de la partie et de notifier de l'évènement
     * @param state L'état de la partie
     */
    public updateState(state: StateGameModel): void {
        this._gameState = state

        this.stateChange.next(state)
    }
    /**
     * Permet de souscrire à l'évènement concernant le changement de l'état de la partie
     * @param callback La fonction qui sera déclenchée lors de la mise à jour de l'état
     */
    public onStateChange(callback: (state: StateGameModel) => void) {
        this.stateChange.subscribe(callback)
    }
}
