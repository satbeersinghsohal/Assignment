const Sequelize = require('sequelize');

const sequelize = new Sequelize('testdb','user','pass',{dialect:'postgres',host:'localhost'});


module.exports = sequelize;