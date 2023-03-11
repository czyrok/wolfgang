import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { CosmeticModel, LinkNamespaceSocketModel, SeparatedCosmeticsListFormControllerModel, TypeCosmeticEnum, UserModel } from 'common'

import { AuthSharedService } from 'src/app/shared/auth/service/auth.shared.service'
import { SocketSharedService } from 'src/app/shared/socket/service/socket.shared.service'

import { DetailedListInteractiveSharedModel } from 'src/app/shared/interactive/list/detailed/model/detailed.list.interactive.shared.model'
import { TabDetailedListInteractiveSharedModel } from 'src/app/shared/interactive/list/detailed/tab/model/tab.detailed.list.interactive.shared.model'
import { SubTabTabDetailedListInteractiveSharedModel } from 'src/app/shared/interactive/list/detailed/tab/sub-tab/model/sub-tab.tab.detailed.list.interactive.shared.model'
import { ItemSubTabTabDetailedListInteractiveSharedModel } from 'src/app/shared/interactive/list/detailed/tab/sub-tab/item/model/item.sub-tab.tab.detailed.list.interactive.shared.model'
import { DisplayAlertSharedService } from 'src/app/shared/alert/display/service/display.alert.shared.service'

@Component({
  selector: 'app-view-main-profile-skin-customization',
  templateUrl: './skin-customization.profile.main.view.component.html',
  styleUrls: ['./skin-customization.profile.main.view.component.scss']
})
/**
 * @classdesc Composant de la vue de customisation du skin
 * @implements OnInit
 */
export class SkinCustomizationProfileMainViewComponent implements OnInit {
  user!: UserModel

  list: DetailedListInteractiveSharedModel = new DetailedListInteractiveSharedModel()

  cosmeticsList!: SeparatedCosmeticsListFormControllerModel
  amount: number = 0

  username!: string

  /**
   * @param router Service qui permet de naviguer entre les vues et de manipuler les URLs.
   * @param activatedRoute Permet d'accéder aux informations sur un itinéraire associé à un composant chargé dans un outlet
   * @param eventSocketLink Service qui permet d'utiliser des sockets
   * @param authSharedService Service d'authentification des utilisateurs
   */
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private socketSharedService: SocketSharedService,
    private authSharedService: AuthSharedService,
    private displayAlertSharedService: DisplayAlertSharedService
  ) {
    const username: string | null | undefined = this.activatedRoute.parent?.snapshot.paramMap.get('username')

    if (username) this.username = username
  }

  /**
   * Initialise le skin de l'utilisateur
   */
  async ngOnInit(): Promise<void> {
    if (this.authSharedService.username !== undefined) {
      this.list.clickedItemEvent.subscribe(() => {
        this.updateSkinAmount()
      })

      this.setUser(this.authSharedService.username)

      this.setCosmeticsList()
    }
  }

  /**
   * @returns Renvois le nom de l'utilisateur
   */
  getUsername(): string | undefined {
    return this.authSharedService.username
  }

  /**
   * Permet de modifier le skin de l'utilisateur en fonction des éléments de customisation sélectionné
   */
  updateSkinAmount(): void {
    let res: number = 0

    for (const item of this.list.selectedItems) {
      switch (item.associedObject.type) {
        case TypeCosmeticEnum.HAT:
          this.hat = item.associedObject
          break
        case TypeCosmeticEnum.HEAD:
          this.head = item.associedObject
          break
        case TypeCosmeticEnum.TOP:
          this.top = item.associedObject
          break
        case TypeCosmeticEnum.PANTS:
          this.pants = item.associedObject
          break
        case TypeCosmeticEnum.SHOES:
          this.shoes = item.associedObject
          break
      }

      if (this.cosmeticsList.notOwnedCosmetics.indexOf(item.associedObject) >= 0) res += item.count
    }

    this.amount = res
  }

  /**
   * Définie l'utilisateur qui modifie son skin
   * @param username Nom de l'utilisateur
   */
  async setUser(username: string): Promise<void> {
    const viewLink: LinkNamespaceSocketModel<void, UserModel> = await this.socketSharedService.buildLink<void, UserModel>('/game/profile/' + username, 'view')

    viewLink.on((data: UserModel) => {
      viewLink.destroy()

      this.user = data
    })

    viewLink.emit()
  }

  /**
   * Définie les éléments de custumisation et leurs types
   */
  async setCosmeticsList(): Promise<void> {
    const cosmeticsLink: LinkNamespaceSocketModel<void, SeparatedCosmeticsListFormControllerModel>
      = await this.socketSharedService.buildLink<void, SeparatedCosmeticsListFormControllerModel>('/game/profile/' + this.username + '/skin-customization', 'cosmetics')

    cosmeticsLink.on((data: SeparatedCosmeticsListFormControllerModel) => {
      this.cosmeticsList = data

      this.configureList(data, TypeCosmeticEnum.HAT)
      this.configureList(data, TypeCosmeticEnum.HEAD)
      this.configureList(data, TypeCosmeticEnum.TOP)
      this.configureList(data, TypeCosmeticEnum.PANTS)
      this.configureList(data, TypeCosmeticEnum.SHOES)
    })

    cosmeticsLink.emit()
  }

  /**
   * Permet de séparer les éléments en fonction de leurs types
   * @param cosmetics Liste des diférents élément de customisation
   * @param type Type des élément de customisation
   */
  configureList(cosmetics: SeparatedCosmeticsListFormControllerModel, type: TypeCosmeticEnum): void {
    const tab = new TabDetailedListInteractiveSharedModel()

    switch (type) {
      case TypeCosmeticEnum.HAT:
        tab.setTitle('Chapeau')
        tab.setVisibility(true)
        break
      case TypeCosmeticEnum.HEAD:
        tab.setTitle('Tête')
        break
      case TypeCosmeticEnum.TOP:
        tab.setTitle('Haut')
        break
      case TypeCosmeticEnum.PANTS:
        tab.setTitle('Pantalon')
        break
      case TypeCosmeticEnum.SHOES:
        tab.setTitle('Chaussures')
        break
    }

    let subTab = new SubTabTabDetailedListInteractiveSharedModel().setIsIconOnly(true).setTitle('Possédé')
    this.configureSubTab(subTab, cosmetics.ownedCosmetics.filter((cosmetic: CosmeticModel) => cosmetic.type === type))
    tab.addSubTab(subTab)

    subTab = new SubTabTabDetailedListInteractiveSharedModel().setIsIconOnly(true).setTitle('Non possédé')
    this.configureSubTab(subTab, cosmetics.notOwnedCosmetics.filter((cosmetic: CosmeticModel) => cosmetic.type === type))
    tab.addSubTab(subTab)

    this.list.addTab(tab)
  }

  /**
   * Permet de configurer la sous-table d'éléments de cosmétiques
   * @param subTab Sous-table d'éléments de cosmétiques
   * @param list Liste de cosmétiques
   */
  configureSubTab(subTab: SubTabTabDetailedListInteractiveSharedModel, list: Array<CosmeticModel>): void {
    for (const cosmetic of list) {
      subTab.addItem(new ItemSubTabTabDetailedListInteractiveSharedModel<CosmeticModel>()
        .setName(cosmetic.translateName)
        .setImgURL('asset/img/cosmetics/' + cosmetic.imageUrl + '.png')
        .setCount(cosmetic.gamePointPrice)
        .setAssociedObject(cosmetic)
        .setIsDisabled(false)
        .setClickedItemEvent(this.list.clickedItemEvent)
      )
    }
  }

  /**
   * Permet de gérer l'événement d'achat des cosmétiques sélectionné
   */
  async purchaseButtonCallback(): Promise<void> {
    const purchaseLink: LinkNamespaceSocketModel<Array<CosmeticModel>, void>
      = await this.socketSharedService.buildLink('/game/profile/' + this.username + '/skin-customization', 'purchase')

    const cosmetics: Array<CosmeticModel> = new Array

    for (const cosmetic of this.list.selectedItems) {
      cosmetics.push(cosmetic.associedObject)
    }

    purchaseLink.on(() => {
      purchaseLink.destroy()

      this.router.navigateByUrl('/game/profile/' + this.user.username)
    })

    purchaseLink.onFail((error: any) => {
      purchaseLink.destroy()

      this.displayAlertSharedService.emitDanger(error)
    })

    purchaseLink.emit(cosmetics)
  }

  hat!: CosmeticModel
  head!: CosmeticModel
  top!: CosmeticModel
  pants!: CosmeticModel
  shoes!: CosmeticModel
}
