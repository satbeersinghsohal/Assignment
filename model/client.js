const Sequelize = require('sequelize')

const sequelize = require('../utils/database');

const client = sequelize.define('client',{
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	username: {
		type: Sequelize.STRING,
		allowNull: false
	},
	email: {
		type: Sequelize.STRING,
		allowNull: false
	},
	tel: {
		type: Sequelize.BIGINT,
		allowNull: false
	},
	claimed: {
		type: Sequelize.BOOLEAN,
	},
	claimedby: {
		type: Sequelize.INTEGER
	}


})


module.exports = client;