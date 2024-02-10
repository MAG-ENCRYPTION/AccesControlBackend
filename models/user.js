const { Sequelize, DataTypes } = require('sequelize');
const database = require('../database');

const User = database.define('user', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  fingerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  tableName: 'users',
});

module.exports = { User };