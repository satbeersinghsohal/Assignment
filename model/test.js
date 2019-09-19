const Sequelize = require('sequelize')

const sequelize = require('../utils/database');

const test = sequelize.define('test',{
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	name: {
		type: Sequelize.STRING,
	}
})


module.exports = test;