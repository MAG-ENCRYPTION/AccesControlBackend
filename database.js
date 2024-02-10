const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('AccessControl', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;