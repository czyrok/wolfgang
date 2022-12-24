import { CosmeticModelDocument } from "../../../../common/src/cosmetic/model/cosmetic.model"
import { TypeCosmeticEnum } from "../../../../common/src/cosmetic/type/enum/type.cosmetic.enum"
import { connect } from 'mongoose'

async function insertCosmetic(translateName: string, gamePointPrice: string, imageUrl: string, type: TypeCosmeticEnum ) {
    await connect("mongodb://localhost:60017/wolfgang", {
        authSource: "admin",
        user: "admin",
        pass: "pass"
    })
    await new CosmeticModelDocument({ translateName, gamePointPrice, imageUrl, type }).save()
}

insertCosmetic("translateName", "price", "url", TypeCosmeticEnum.HAT)
insertCosmetic("translateName", "price", "url", TypeCosmeticEnum.HEAD)
insertCosmetic("translateName", "price", "url", TypeCosmeticEnum.TOP)
insertCosmetic("translateName", "price", "url", TypeCosmeticEnum.PANTS)
insertCosmetic("translateName", "price", "url", TypeCosmeticEnum.SHOES) 
