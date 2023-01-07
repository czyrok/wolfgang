import { TypeNotificationUserEnum } from '../type/enum/type.notification.user.enum'

export interface NotificationUserInterface {
    releaseDate: Date
    translate?: string
    data: any
    redirection?: string
    type: TypeNotificationUserEnum
}