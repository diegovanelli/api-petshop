const Model = require('./ProductTableModel')

module.exports = {
    list(providerId) {
        return Model.findAll({
            where: {
                provider: providerId
            }
        })
    },
    insert(data) {
        return Model.create(data)
    },
    remove(productId, providerId) {
        return Model.destroy({
            where: {
                id: productId,
                provider: productId
            }
        })
    }
}