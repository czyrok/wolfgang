import { TypeLogUserEnum } from '../type/enum/type.log.user.enum'

export interface LogUserInterface {
    releaseDate: Date
    data: any
    type: TypeLogUserEnum
}