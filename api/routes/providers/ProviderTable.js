const Model = require('./TableModelProviders');

module.exports = {
    list () {
        return Model.findAll()
    },
    insert(provider) {
        return Model.create(provider)
    },
    async findById(id) {
        const provider = await Model.findOne({
            where: {
                id: id
            }
        })
        if (!provider) {
            throw new Error('Provider not found')
        }

        return provider
    },
    update(id, updateData) {
        return Model.update(
            updateData,
            {
                where: { id: id}
            }
        )
    }
}