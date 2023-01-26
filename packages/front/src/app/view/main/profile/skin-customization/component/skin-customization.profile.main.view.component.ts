import { Component, OnInit } from '@angular/core'

import { CosmeticModel, ReceiverLinkSocketModel, SenderLinkSocketModel, SeparatedCosmeticsListFormControllerModel, TypeCosmeticEnum, UserModel } from 'common'

import { AuthSharedService } from 'src/app/shared/auth/service/auth.shared.service'
import { SocketSharedService } from 'src/app/shared/socket/service/socket.shared.service'

import { DetailedListInteractiveSharedModel } from 'src/app/shared/interactive/list/detailed/model/detailed.list.interactive.shared.model'
import { TabDetailedListInteractiveSharedModel } from 'src/app/shared/interactive/list/detailed/tab/model/tab.detailed.list.interactive.shared.model'
import { SubTabTabDetailedListInteractiveSharedModel } from 'src/app/shared/interactive/list/detailed/tab/sub-tab/model/sub-tab.tab.detailed.list.interactive.shared.model'
import { ItemSubTabTabDetailedListInteractiveSharedModel } from 'src/app/shared/interactive/list/detailed/tab/sub-tab/item/model/item.sub-tab.tab.detailed.list.interactive.shared.model'
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-view-main-profile-skin-customization',
  templateUrl: './skin-customization.profile.main.view.component.html',
  styleUrls: ['./skin-customization.profile.main.view.component.scss']
})
export class SkinCustomizationProfileMainViewComponent implements OnInit {
  user!: UserModel

  list: DetailedListInteractiveSharedModel = new DetailedListInteractiveSharedModel()

  cosmeticsList!: SeparatedCosmeticsListFormControllerModel
  amount: number = 0
  
  username!: string

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private eventSocketLink: SocketSharedService,
    private authSharedService: AuthSharedService
  ) {
    const username: string | null | undefined = this.activatedRoute.parent?.snapshot.paramMap.get('username')

    console.log(username)

    if (username) this.username = username
  }

  async ngOnInit(): Promise<void> {
    if (this.authSharedService.username !== undefined) {
      this.list.clickedItemEvent.subscribe(() => {
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
          }

          if (this.cosmeticsList.notOwnedCosmetics.indexOf(item.associedObject) >= 0) {
            res += item.count
          }
        }

        this.amount = res
      })
      const userLink: ReceiverLinkSocketModel<UserModel> = (await this.eventSocketLink.registerReceiver<UserModel>('/game/profile', 'view')).subscribe(
        (data: UserModel) => {
          this.user = data
          userLink.unsubscribe()
        }
      )

      const usernameLink: SenderLinkSocketModel<string> = await this.eventSocketLink.registerSender<string>('/game/profile', 'view')

      usernameLink.emit(this.authSharedService.username)

      const cosmeticsLink: ReceiverLinkSocketModel<SeparatedCosmeticsListFormControllerModel>
        = await this.eventSocketLink.registerReceiver<SeparatedCosmeticsListFormControllerModel>('/game/profile/skin-customization', 'cosmetics')

      cosmeticsLink.subscribe(
        (data: SeparatedCosmeticsListFormControllerModel) => {
          this.cosmeticsList = data
          console.log(data)
          this.configureList(data, TypeCosmeticEnum.HAT)
          this.configureList(data, TypeCosmeticEnum.HEAD)
          this.configureList(data, TypeCosmeticEnum.TOP)
          this.configureList(data, TypeCosmeticEnum.PANTS)
          this.configureList(data, TypeCosmeticEnum.SHOES)
        }
      )

      const cosmeticsSend: SenderLinkSocketModel<void> = await this.eventSocketLink.registerSender<void>('/game/profile/skin-customization', 'cosmetics')

      cosmeticsSend.emit()
    }
  }

  getUsername(): string | undefined {
    return this.authSharedService.username
  }

  configureList(cosmetics: SeparatedCosmeticsListFormControllerModel, type: TypeCosmeticEnum): void {

    let tab = new TabDetailedListInteractiveSharedModel()

    switch (type) {
      case TypeCosmeticEnum.HAT:
        tab.setTitle('Hat')
        tab.setVisibility(true)
        break
      case TypeCosmeticEnum.HEAD:
        tab.setTitle('Head')
        break
      case TypeCosmeticEnum.TOP:
        tab.setTitle('Top')
        break
      case TypeCosmeticEnum.PANTS:
        tab.setTitle('Pants')
        break
      case TypeCosmeticEnum.SHOES:
        tab.setTitle('Shoes')
    }

    let subTab = new SubTabTabDetailedListInteractiveSharedModel().setIsIconOnly(true).setTitle('Possédé')
    this.configureSubTab(subTab, cosmetics.ownedCosmetics.filter((cosmetic: CosmeticModel) => cosmetic.type === type))
    tab.addSubTab(subTab)

    subTab = new SubTabTabDetailedListInteractiveSharedModel().setIsIconOnly(true).setTitle('Non possédé')
    this.configureSubTab(subTab, cosmetics.notOwnedCosmetics.filter((cosmetic: CosmeticModel) => cosmetic.type === type))
    tab.addSubTab(subTab)

    this.list.addTab(tab)
  }

  configureSubTab(subTab: SubTabTabDetailedListInteractiveSharedModel, list: Array<CosmeticModel>): void {
    for (let cosmetic of list) {
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

  async purchaseButtonCallback(): Promise<void> {
    const purchaseSend: SenderLinkSocketModel<Array<CosmeticModel>> = await this.eventSocketLink.registerSender('/game/profile/skin-customization', 'purchase')
    const purchaseRec: ReceiverLinkSocketModel<void> = await this.eventSocketLink.registerReceiver('/game/profile/skin-customization', 'purchase')
    const cosmetics: Array<CosmeticModel> = new Array

    for (const cosmetic of this.list.selectedItems) {
      cosmetics.push(cosmetic.associedObject)
    }

    purchaseRec.subscribe(() => {
      purchaseRec.unsubscribe()

      console.log('ouiiiiiii')

      this.router.navigateByUrl('/game/profile/' + this.user.username)
    })

    purchaseSend.emit(cosmetics)
  }

  hat!: CosmeticModel
  head!: CosmeticModel
  top!: CosmeticModel
  pants!: CosmeticModel
  shoes!: CosmeticModel
}
