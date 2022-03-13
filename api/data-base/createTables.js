const models = [
    require('../routes/providers/ProvidersTableModel'),
    require('../routes/providers/products/ProductTableModel')
    
] 

function createTables() {
    models.forEach(async (value) => {
        await value.sync()
    })
}

createTables();