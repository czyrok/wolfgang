const dotenv = require('dotenv')
const mongoose = require('mongoose')
const common = require('common')

async function insertScope(name, parent = undefined) {
    await new common.ScopeModelDocument(new common.ScopeModel(name, parent)).save()
}

async function run() {
    dotenv.config({ path: process.cwd() + '/' + (process.env.NODE_ENV === 'PROD' ? '.prod.env' : '.dev.env') })

    await mongoose.connect(`mongodb://localhost:${process.env.DB_PORT}/wolfgang`, {
        authSource: 'admin',
        user: process.env.DB_USER,
        pass: process.env.DB_PW
    })
    
    await insertScope('admin')
}

run().then(() => {
    process.exit()
})