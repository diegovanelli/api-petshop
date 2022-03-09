const Sequelize = require('sequelize');
const instance = require('../../data-base');

const columns = {
    company: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    category: {
        type: Sequelize.ENUM('ration', 'toys'),
        allowNull: false
    }

}

const options = {
    freezeTableName: true,
    tableName: 'provider',
    timestamps: true
}

module.exports = instance.define('provider', columns, options);