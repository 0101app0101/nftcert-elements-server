require('dotenv').config()
var mysql = require('mysql2');

var db = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

db.connect(function (err) {
    if (err) throw err;
    console.log("Connected to mysql server");
});

module.exports = {db}