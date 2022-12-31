import { TypeAlertEnum } from '../type/enum/type.alert.enum'

export interface AlertInterface {
    type: TypeAlertEnum
    text: string
}