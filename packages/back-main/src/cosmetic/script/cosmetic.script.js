const mongoose = require('mongoose')
const common = require('common')

async function insertCosmetic(translateName, gamePointPrice, imageUrl, type) {
    await new common.CosmeticModelDocument(new common.CosmeticModel(translateName, gamePointPrice, imageUrl, type)).save()
}

async function run() {
    await mongoose.connect('mongodb://localhost:60017/wolfgang', {
        authSource: 'admin',
        user: 'admin',
        pass: 'pass'
    })
    
    insertCosmetic('Chapeau 1', 20, 'hat_1', common.TypeCosmeticEnum.HAT)
    insertCosmetic('Tête 1', 5, 'head_1', common.TypeCosmeticEnum.HEAD)
    insertCosmetic('Tee-shirt 1', 20, 'top_1', common.TypeCosmeticEnum.TOP)
    insertCosmetic('Jean 1', 30, 'pants_1', common.TypeCosmeticEnum.PANTS)
    insertCosmetic('Chaussures 1', 80, 'shoes_1', common.TypeCosmeticEnum.SHOES)

    insertCosmetic('Chapeau 2', 28, 'hat_2', common.TypeCosmeticEnum.HAT)
    insertCosmetic('Tête 2', 10, 'head_2', common.TypeCosmeticEnum.HEAD)
    insertCosmetic('Tee-shirt 2', 23, 'top_2', common.TypeCosmeticEnum.TOP)
    insertCosmetic('Jean 2', 29, 'pants_2', common.TypeCosmeticEnum.PANTS)
    insertCosmetic('Chaussures 2', 40, 'shoes_2', common.TypeCosmeticEnum.SHOES)

    insertCosmetic('Chapeau 3', 20, 'hat_3', common.TypeCosmeticEnum.HAT)
    insertCosmetic('Tête 3', 10, 'head_3', common.TypeCosmeticEnum.HEAD)
    insertCosmetic('Tee-shirt 3', 27, 'top_3', common.TypeCosmeticEnum.TOP)
    insertCosmetic('Jean 3', 11, 'pants_3', common.TypeCosmeticEnum.PANTS)
    insertCosmetic('Chaussures 3', 50, 'shoes_3', common.TypeCosmeticEnum.SHOES)
}

run()