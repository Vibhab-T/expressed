const mysql = require('mysql2');

const pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	database: 'expressshop',
	password: 'rootroot',
});

module.exports = pool.promise();
