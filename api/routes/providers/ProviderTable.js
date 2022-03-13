const Model = require('./TableModelProviders');
const NotFound = require('../../errors/NotFound')

module.exports = {
    list () {
        return Model.findAll({raw: true})
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
            throw new NotFound()
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
    },
    remove(id) {
        return Model.destroy({
            where: { id: id }
        })
    }
}