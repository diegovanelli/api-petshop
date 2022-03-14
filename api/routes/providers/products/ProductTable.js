const NotFound = require('../../../errors/NotFound')
const Model = require('./ProductTableModel')
const instance = require('../../../data-base')

module.exports = {
    list(providerId) {
        return Model.findAll({
            where: {
                provider: providerId
            },
            raw: true
        })
    },
    insert(data) {
        return Model.create(data)
    },
    remove(productId, providerId) {
        return Model.destroy({
            where: {
                id: productId,
                provider: providerId
            }
        })
    },
    async getById(productId, providerId) {
        const product = await Model.findOne({
            where: {
                id: productId,
                provider: providerId
            },
            raw: true
        })

        if (!product) {
            throw new NotFound('Product')
        }

        return product
    },
    update(productData, updateData) {
        return Model.update(
            updateData, 
            {
                where: productData
            }
        )
    },
    subtract(productId, providerId, field, quantity) {
        return instance.transaction(async transaction => {
            const product = await Model.findOne({
                where: {
                    id: productId,
                    provider: providerId
                }
            })

            product[field] = quantity

            await product.save()

            return product
        })
    }
}