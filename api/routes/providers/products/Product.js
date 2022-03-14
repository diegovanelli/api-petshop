const InvalidField = require('../../../errors/InvalidField')
const NoData = require('../../../errors/NoData')
const Table = require('./ProductTable')

class Product {
    constructor({ id, title, price, stock, provider, createdAt, updatedAt}) {
        this.id = id
        this.title = title
        this.price = price
        this.stock = stock
        this.provider = provider
        this.createdAt = createdAt
        this.updatedAt = updatedAt
    }

    validate() {
        if (typeof this.title !== 'string' || this.title.length === 0) {
            throw new InvalidField('title')
        }

        if (typeof this.price !== 'number' || this.title === 0) {
            throw new InvalidField('price')
        }
    }

    async create() {
        this.validate()
        const result = await Table.insert({
            title: this.title,
            price: this.price,
            stock: this.stock,
            provider: this.provider
        })

        this.id = result.id
        this.createdAt = result.createdAt
        this.updatedAt = result.updatedAt
    }

    delete() {
        return Table.remove(this.id, this.provider)
    }

    async load() {
        const product = await Table.getById(this.id, this.provider)
        this.title = product.title
        this.price = product.price
        this.stock = product.stock
        this.createdAt = product.createdAt
        this.updatedAt = product.updatedAt
    }

    update() {
        const updateData = {}

        if (typeof this.title === 'string' && this.title.length > 0) {
            updateData.title = this.title
        }

        if (typeof this.price === 'number' && this.price > 0) {
            updateData.price = this.price
        }

        if (typeof this.stock === 'number') {
            updateData.stock = this.stock
        }

        if (Object.keys(updateData).length === 0) {
            throw new NoData()
        }

        return Table.update(
            {
                id: this.id,
                provider: this.provider
            },
            updateData
        )
    }

    decreaseStock() {
        return Table.subtract(
            this.id,
            this.provider,
            'stock',
            this.stock
        )
    }
}

module.exports = Product