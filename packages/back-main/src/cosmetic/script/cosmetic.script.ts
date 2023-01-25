import { connect } from 'mongoose'

import { CosmeticModel, CosmeticModelDocument } from 'common'

import { TypeCosmeticEnum } from 'common'

async function insertCosmetic(translateName: string, gamePointPrice: number, imageUrl: string, type: TypeCosmeticEnum): Promise<void> {
    await new CosmeticModelDocument(new CosmeticModel(translateName, gamePointPrice, imageUrl, type)).save()
}

async function run(): Promise<void> {
    await connect('mongodb://localhost:60017/wolfgang', {
        authSource: 'admin',
        user: 'admin',
        pass: 'pass'
    })
    
    insertCosmetic('chapeau2', 20, 'urlchap2', TypeCosmeticEnum.HAT)
    insertCosmetic('lunette2', 5, 'urllun2', TypeCosmeticEnum.HEAD)
    insertCosmetic('t-shirt', 20, 'urltsh', TypeCosmeticEnum.TOP)
    insertCosmetic('jean', 30, 'urljean', TypeCosmeticEnum.PANTS)
    insertCosmetic('chaussure', 80, 'urlchau', TypeCosmeticEnum.SHOES)
}

run()