const {DataTypes} = require('sequelize')
const {sequelize} = require('../util/database')

module.export = {
    User: sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        username: DataTypes.STRING,
        hachedPass: DataTypes.STRING
    })
}