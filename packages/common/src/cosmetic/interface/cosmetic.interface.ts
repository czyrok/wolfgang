import { TypeCosmeticEnum } from '../type/enum/type.cosmetic.enum'

export interface CosmeticInterface {
    translateName: string
    gamePointPrice: string
    imageUrl: string
    type: TypeCosmeticEnum
}