const Sequelize = require('sequelize')
const instance = require('../../../data-base')

const columns = {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    stock: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    provider: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: require('../ProvidersTableModel'),
            key: 'id'
        }
    }
}

const options = {
    freezeTableName: true,
    tableName: 'products',
    timestamps: true
}

module.exports = instance.define('product', columns, options)