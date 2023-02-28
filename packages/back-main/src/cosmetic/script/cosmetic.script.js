import { connect } from 'mongoose'
import { CosmeticModelDocument, CosmeticModel, TypeCosmeticEnum } from 'common'

async function insertCosmetic(translateName, gamePointPrice, imageUrl, type) {
    await new CosmeticModelDocument(new CosmeticModel(translateName, gamePointPrice, imageUrl, type)).save()
}

async function run() {
    await connect('mongodb://localhost:60017/wolfgang', {
        authSource: 'admin',
        user: 'admin',
        pass: 'pass'
    })
    
    insertCosmetic('Chapeau 1', 20, 'hat_1', TypeCosmeticEnum.HAT)
    insertCosmetic('Tête 1', 5, 'head_1', TypeCosmeticEnum.HEAD)
    insertCosmetic('Tee-shirt 1', 20, 'top_1', TypeCosmeticEnum.TOP)
    insertCosmetic('Jean 1', 30, 'pants_1', TypeCosmeticEnum.PANTS)
    insertCosmetic('Chaussures 1', 80, 'shoes_1', TypeCosmeticEnum.SHOES)

    insertCosmetic('Chapeau 2', 28, 'hat_2', TypeCosmeticEnum.HAT)
    insertCosmetic('Tête 2', 10, 'head_2', TypeCosmeticEnum.HEAD)
    insertCosmetic('Tee-shirt 2', 23, 'top_2', TypeCosmeticEnum.TOP)
    insertCosmetic('Jean 2', 29, 'pants_2', TypeCosmeticEnum.PANTS)
    insertCosmetic('Chaussures 2', 40, 'shoes_2', TypeCosmeticEnum.SHOES)

    insertCosmetic('Chapeau 3', 20, 'hat_3', TypeCosmeticEnum.HAT)
    insertCosmetic('Tête 3', 10, 'head_3', TypeCosmeticEnum.HEAD)
    insertCosmetic('Tee-shirt 3', 27, 'top_3', TypeCosmeticEnum.TOP)
    insertCosmetic('Jean 3', 11, 'pants_3', TypeCosmeticEnum.PANTS)
    insertCosmetic('Chaussures 3', 50, 'shoes_3', TypeCosmeticEnum.SHOES)
}

run()