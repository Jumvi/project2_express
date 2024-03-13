const { DataTypes } = require('sequelize');
const users = require('./Users');
const {sequelize} = require('../config/database');


    const articles = sequelize.define('Articles', {
        idarticle: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
           
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        timepost: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        idusers:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        articlepdf :{
            type:DataTypes.STRING,
            allowNull:true
        },
        articleimage:{
            type:DataTypes.STRING,
            allowNull:true
        }
    
    },{
        tableName:'articles',
        timestamps:false
    });

    // Définir la relation entre Articles et Users
    articles.belongsTo(users, {
        foreignKey: 'idusers'
    });

 module.exports = articles;
