import { TypeAlertEnum } from 'common'

import { ButtonListDisplayAlertSharedInterface } from '../button-list/interface/button-list.display.alert.shared.interface'

export interface DisplayAlertSharedInterface {
    type: TypeAlertEnum
    text: string
    buttonList?: Array<ButtonListDisplayAlertSharedInterface>
}