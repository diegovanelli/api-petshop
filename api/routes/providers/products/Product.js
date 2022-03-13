const InvalidField = require('../../../errors/InvalidField')
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
}

module.exports = Product