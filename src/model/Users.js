const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/database');

const users = sequelize.define('Users', {
    idusers: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 20] // La longueur doit être entre 1 et 20 caractères
        }
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 20] // La longueur doit être entre 1 et 20 caractères
        }
    },
    userpass: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 20] // La longueur doit être entre 1 et 20 caractères
        }
    }
},{
    tableName:'users',
    timestamps:false
});

module.exports = users;
