const mongoose = require('mongoose')
const common = require('common')

async function insertScope(name, parent = undefined) {
    await new common.ScopeModelDocument(new common.ScopeModel(name, parent)).save()
}

async function run() {
    await mongoose.connect('mongodb://localhost:60017/wolfgang', {
        authSource: 'admin',
        user: 'admin',
        pass: 'pass'
    })
    
    await insertScope('admin')
}

run()