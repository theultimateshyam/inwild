require('dotenv').config();
const mysql = require('mysql');

var pool = mysql.createPool({
	connectionLimit: 10,
	host: process.env.mysqlDbURI,
	user: process.env.mysqluser,
	password: process.env.mysqlpassword,
	database: 'inwild'
	// insecureAuth: true
});
console.log('Connected to mysql DB');
module.exports = pool;
