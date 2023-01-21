import { ComponentRef } from '@angular/core'
import { TypeAlertEnum } from 'common'

import { ElementDisplayAlertSharedComponent } from '../element/component/element.display.alert.shared.component'

import { ButtonListDisplayAlertSharedInterface } from '../button-list/interface/button-list.display.alert.shared.interface'

export interface DisplayAlertSharedInterface {
    componentRef?: ComponentRef<ElementDisplayAlertSharedComponent>
    type: TypeAlertEnum
    text: string
    detailed?: boolean
    timer?: boolean
    buttonList?: Array<ButtonListDisplayAlertSharedInterface>
}