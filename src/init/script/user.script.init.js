const dotenv = require('dotenv')
const mongoose = require('mongoose')
const common = require('common')

async function insertAdminUser() {
    const hatCosmetic = await common.CosmeticModelDocument.findOne({ type: common.TypeCosmeticEnum.HAT }).exec(),
        headCosmetic = await common.CosmeticModelDocument.findOne({ type: common.TypeCosmeticEnum.HEAD }).exec(),
        topCosmetic = await common.CosmeticModelDocument.findOne({ type: common.TypeCosmeticEnum.TOP }).exec(),
        pantsCosmetic = await common.CosmeticModelDocument.findOne({ type: common.TypeCosmeticEnum.PANTS }).exec(),
        shoesCosmetic = await common.CosmeticModelDocument.findOne({ type: common.TypeCosmeticEnum.SHOES }).exec()

    const skin = new common.SkinUserModelDocument(new common.SkinUserModel(hatCosmetic, headCosmetic, topCosmetic, pantsCosmetic, shoesCosmetic))

    const newUser = new common.UserModelDocument(new common.UserModel(skin, 'admin', 'admin@test.fr', 'admin'))

    let newPurchase = new common.PurchaseCosmeticModelDocument()

    newPurchase.cosmetic = hatCosmetic
    newPurchase.user = newUser
    newPurchase.save()

    newPurchase = new common.PurchaseCosmeticModelDocument()
    newPurchase.cosmetic = headCosmetic
    newPurchase.user = newUser
    newPurchase.save()

    newPurchase = new common.PurchaseCosmeticModelDocument()
    newPurchase.cosmetic = topCosmetic
    newPurchase.user = newUser
    newPurchase.save()

    newPurchase = new common.PurchaseCosmeticModelDocument()
    newPurchase.cosmetic = pantsCosmetic
    newPurchase.user = newUser
    newPurchase.save()

    newPurchase = new common.PurchaseCosmeticModelDocument()
    newPurchase.cosmetic = shoesCosmetic
    newPurchase.user = newUser
    newPurchase.save()

    const adminScope = await new common.ScopeModelDocument(new common.ScopeModel('admin')).save()

    await skin.save()

    newUser.scopeAccess.push(adminScope)

    await newUser.save()
}

async function run() {
    dotenv.config({ path: process.cwd() + '/' + (process.env.NODE_ENV === 'PROD' ? '.prod.env' : '.dev.env') })

    common.LogUtil.config = common.LogHelper.getConfig(
        common.TypeLogEnum.APP,
    )

    await mongoose.connect(`mongodb://localhost:${process.env.DB_PORT}/wolfgang`, {
        authSource: 'admin',
        user: process.env.DB_USER,
        pass: process.env.DB_PW
    })
    
    await insertAdminUser()
}

run().then(() => {
    process.exit()
})