const Sequelize = require('sequelize');

const sequelize = new Sequelize('expressshop', 'root', 'rootroot', {
	dialect: 'mysql',
	host: 'localhost',
});

module.exports = sequelize;
