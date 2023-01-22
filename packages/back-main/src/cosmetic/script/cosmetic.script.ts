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
    
    insertCosmetic('chapeau', 10, 'urldf', TypeCosmeticEnum.HAT)
    insertCosmetic('lunette', 2, 'urllun', TypeCosmeticEnum.HEAD)
    insertCosmetic('chemise', 50, 'urlche', TypeCosmeticEnum.TOP)
    insertCosmetic('pantalon', 11, 'urlpan', TypeCosmeticEnum.PANTS)
    insertCosmetic('basket', 100, 'urlbas', TypeCosmeticEnum.SHOES)
}

run()