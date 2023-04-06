import { TypeCosmeticEnum } from '../type/enum/type.cosmetic.enum'

export interface CosmeticInterface {
    translateName: string
    gamePointPrice: number
    imageUrl: string
    type: TypeCosmeticEnum
}