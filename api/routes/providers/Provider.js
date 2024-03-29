const InvalidField = require('../../errors/InvalidField');
const NoData = require('../../errors/NoData');
const ProviderTable = require('./ProviderTable');

class Provider {
    constructor({ id, company, email, category, createdAt, updatedAt }) {
        this.id = id
        this.company = company
        this.email = email
        this.category = category
        this.createdAt = createdAt
        this.updatedAt = updatedAt
    }

    async create() {
        this.validate()
        const result = await ProviderTable.insert({
            company: this.company,
            email: this.email,
            category: this.category
        })

        this.id = result.id;
        this.createdAt = result.createdAt
        this.updatedAt = result.updatedAt
    }

    async load() {
        const provider = await ProviderTable.findById(this.id)
        this.company = provider.company
        this.email = provider.email
        this.category = provider.category
        this.createdAt = provider.createdAt
        this.updatedAt = provider.updatedAt
    }

    async update() {
        await ProviderTable.findById(this.id)
        const fields = ['company', 'email', 'category']
        const updateData = {}

        fields.forEach((field) => {
            const value = this[field]

            if (typeof value === 'string' && value.length > 0) {
                updateData[field] = value
            }
        })

        if (Object.keys(updateData).length === 0) {
            throw new NoData()
        }

        await ProviderTable.update(this.id, updateData)
    }

    remover() {
        ProviderTable.remove(id);
    }

    validate() {
        const fields = ['company',  'email', 'category'];

        fields.forEach(field => {
            const value = this[field]
            if (typeof(value) !== 'string' || value.length === 0) {
                throw new InvalidField(field)
            }
        })
    }
}

module.exports = Provider